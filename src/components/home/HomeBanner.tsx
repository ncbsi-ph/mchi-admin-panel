import { Card, Image, message, Skeleton } from 'antd';
import { useUser } from '../../store/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Table, { ColumnsType } from 'antd/es/table';
import { editBannerPosition, getHomeBanner } from '../../api';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { handleError } from '../../helpers';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { CSS } from '@dnd-kit/utilities';
import AddHomeBanner from './AddHomeBanner';
import EditHomeBanner from './EditHomeBanner';
import DeleteHomeBanner from './DeleteHomeBanner';

const HomeBanner: React.FC = () => {
  const { token } = useUser();
  const [messageApi, contextHolder] = message.useMessage();
  const queryClient = useQueryClient();

  const columns: ColumnsType<HomeBannerType> = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (value) => <Image src={value} width={200} />,
      width: 200,
    },
    {
      title: 'Header',
      dataIndex: 'header',
      key: 'header',
    },
    {
      title: 'Sub Header',
      dataIndex: 'sub_header',
      key: 'sub_header',
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
    },
    {
      key: 'action',
      render: (_, record) => (
        <div className="flex justify-end">
          <EditHomeBanner data={record} />
          <DeleteHomeBanner data={record} />
        </div>
      ),
    },
  ];

  interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string;
  }

  // Row component that makes each row draggable
  const Row = (props: RowProps) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({
      id: props['data-row-key'],
    });

    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Translate.toString(transform),
      transition,
      cursor: 'move',
      ...(isDragging ? { position: 'relative', zIndex: 10 } : {}),
    };

    return (
      <tr
        {...props}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
    );
  };

  const { isLoading, error, data } = useQuery({
    queryKey: ['home-banner'],
    queryFn: () => getHomeBanner(token),
    enabled: !!token,
    select: (data) =>
      data.map((item) => ({
        ...item,
        key: item.id.toString(),
      })),
  });

  const [dataSource, setDataSource] = useState<HomeBannerType[]>([]);

  useEffect(() => {
    if (data) {
      setDataSource(data);
    }
  }, [data]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const positionMutation = useMutation({
    mutationFn: async (payload: BannerPosition[]) => {
      try {
        const response = await editBannerPosition(payload, token);
        messageApi.success(response);
      } catch (err: any) {
        handleError(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['home-banner'] });
    },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        const newData = arrayMove(prev, activeIndex, overIndex);

        const payload: BannerPosition[] = newData.map((item, i) => ({
          id: item.id,
          position: i,
        }));

        positionMutation.mutate(payload);

        return newData;
      });
    }
  };

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{`An error has occurred: ${error.message}`}</p>;
  return (
    <div>
      {contextHolder}
      <Card
        title={
          <div className="flex  items-center justify-between">
            <h2>Home Banner</h2>
            <AddHomeBanner dataLength={data?.length} />
          </div>
        }
      >
        <DndContext
          sensors={sensors}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={dataSource.map((i) => i.key)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              components={{ body: { row: Row } }}
              rowKey="key"
              columns={columns}
              dataSource={dataSource}
            />
          </SortableContext>
        </DndContext>
      </Card>
    </div>
  );
};

export default HomeBanner;
