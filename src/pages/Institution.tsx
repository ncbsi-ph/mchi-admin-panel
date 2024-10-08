import { useEffect } from 'react';
import { useBreadcrumbActions, useUser } from '../store/store';
import { useQuery } from '@tanstack/react-query';
import { getInstitution } from '../api';
import { Card, Descriptions, DescriptionsProps, Image, Skeleton } from 'antd';
import InstitutionModalForm from '../components/institution/InstitutionModalForm';

const Institution = () => {
  const { token } = useUser();
  const { setItems } = useBreadcrumbActions();

  useEffect(() => {
    setItems([
      {
        title: 'Dashboard',
        href: '/',
      },
      {
        title: 'Institution',
      },
    ]);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['institution'],
    queryFn: () => getInstitution(token),
    enabled: !!token,
  });

  if (isLoading) return <Skeleton active />;
  if (error) return <p>{` An error has occurred:  ${error.message}`}</p>;

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Hero Background',
      children: <Image src={data?.hero_background} width={250} />,
      span: 2,
    },
    {
      key: '2',
      label: 'Logo',
      children: <Image src={data?.logo} width={250} />,
    },
    {
      key: '3',
      label: 'Logo white',
      children: (
        <div className="bg-slate-100 p-2  ">
          <Image src={data?.logo_white} width={250} />
        </div>
      ),
    },
    {
      key: '4',
      label: 'Contact no',
      children: data?.contact_no,
    },
    {
      key: '5',
      label: 'Address',
      children: data?.address,
    },
    {
      key: '6',
      label: 'General Information',
      children: data?.email_general_info,
    },
    {
      key: '7',
      label: 'Careers',
      children: data?.email_careers,
    },
    {
      key: '8',
      label: 'HMO Approval Rquest',
      children: data?.email_hmo_approval,
    },
    {
      key: '9',
      label: 'Appointment',
      children: data?.email_appointment,
    },
  ];

  return (
    <Card
      title={
        <div className="flex items-center justify-between">
          <h2>Institutions</h2>
          <InstitutionModalForm data={data} />
        </div>
      }
    >
      <Descriptions
        labelStyle={{
          color: 'black',
        }}
        bordered
        items={items}
        column={2}
      />
    </Card>
  );
};

export default Institution;
