import { Modal } from 'antd';
import { DeleteButton } from '../helpers';
import { AiFillExclamationCircle } from 'react-icons/ai';

interface DeleteModalProps {
  open: boolean;
  onClick: () => void;
  onCancel: () => void;
  title: string;
  onSubmit: () => void;
  isSubmitting: boolean;
  target?: string;
}

const DeleteModal = ({
  open,
  onClick,
  onCancel,
  title,
  onSubmit,
  isSubmitting,
  target,
}: DeleteModalProps) => {
  return (
    <div>
      <DeleteButton onClick={onClick} />
      <Modal
        open={open}
        onCancel={onCancel}
        okButtonProps={{ style: { background: 'rgb(220 38 38)' } }}
        closeIcon={false}
        title={
          <div className="flex gap-x-1">
            <div className="text-2xl">
              <AiFillExclamationCircle className="text-red-600" />
            </div>
            <p>Are you sure to delete this {title}?</p>
          </div>
        }
        onOk={onSubmit}
        confirmLoading={isSubmitting}
      >
        <div className="grid gap-y-2">
          <p>This cannot be undone and will permanently deleted</p>
          {target?.length !== undefined && (
            <p className="text-xs line-clamp-2">
              Target: <span className="font-bold">{target}</span>
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
