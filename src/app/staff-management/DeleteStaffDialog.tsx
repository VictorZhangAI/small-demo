'use client';

interface DeleteStaffDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  staff: any;
}

export default function DeleteStaffDialog({ isOpen, onClose, onDelete, staff }: DeleteStaffDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">确认删除</h2>
        <p className="mb-4">
          您确定要删除员工 {staff?.full_name} 吗？此操作无法撤销。
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            取消
          </button>
          <button
            onClick={() => {
              onDelete();
              onClose();
            }}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
} 