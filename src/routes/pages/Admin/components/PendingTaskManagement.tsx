import { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, CardHeader, Spinner } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { toast } from 'react-toastify';
import { taskApi } from '@/routes/pages/Admin/adminApi';
import { EUserTaskCompletionStatus } from '@/routes/pages/Admin/interface';

interface PendingTask {
  id: number;
  userId: number;
  taskId: number;
  taskTitle: string;
  taskResult: string;
  status: number;
  createdAt: number;
  updatedAt: number;
  taskType: string;
}

export const PendingTaskManagement = () => {
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  // Pending task details modal
  const { isOpen: isPendingDetailsOpen, onOpen: onPendingDetailsOpen, onOpenChange: onPendingDetailsOpenChange } = useDisclosure();
  const [selectedPendingTask, setSelectedPendingTask] = useState<PendingTask | null>(null);

  // Format time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US');
  };

  // Load pending tasks
  const loadPendingTasks = useCallback(async () => {
    try {
      setLoading(true);
      const response = await taskApi.getPendingPostTwitterTasks(page, pageSize);
      if (response.code === '200') {
        setPendingTasks(response.list as PendingTask[]);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('Failed to load pending tasks:', error);
      toast.error('Failed to load pending tasks');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  // Approve task
  const approveTask = async (id: number) => {
    try {
      setLoading(true);
      const response = await taskApi.approveTask(id);
      if (response.code === '200') {
        toast.success('Task approved successfully');
        loadPendingTasks();
        // onPendingDetailsOpenChange();
      } else {
        toast.error(response.msg || 'Approval failed');
      }
    } catch (error) {
      console.error('Failed to approve task:', error);
      toast.error('Failed to approve task');
    } finally {
      setLoading(false);
    }
  };

  // View pending task details
  const viewPendingTaskDetails = (task: PendingTask) => {
    setSelectedPendingTask(task);
    onPendingDetailsOpen();
  };

  useEffect(() => {
    loadPendingTasks();
  }, [loadPendingTasks]);

  return (
    <div className="space-y-6">
      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <Spinner color="primary" size="lg" />
        </div>
      )}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Pending Task Management</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Pending Twitter Post Tasks</h4>
            </div>

            <Table aria-label="Pending Task List">
              <TableHeader>
                <TableColumn>ID</TableColumn>
                <TableColumn>Task Type</TableColumn>
                <TableColumn>User ID</TableColumn>
                <TableColumn>Task Title</TableColumn>
                <TableColumn>Submitted Content</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Submitted At</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody>
                {pendingTasks?.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.id}</TableCell>
                    <TableCell>{task.taskType}</TableCell>
                    <TableCell>{task.userId}</TableCell>
                    <TableCell>{task.taskTitle}</TableCell>
                    <TableCell className="max-w-xs truncate">{task.taskResult}</TableCell>
                    <TableCell>
                      <Chip
                        color={task.status === EUserTaskCompletionStatus.UserTaskCompletionStatusPending ? 'warning' : 'success'}
                        variant="light"
                      >
                        {task.status === EUserTaskCompletionStatus.UserTaskCompletionStatusPending ? 'Pending' : 'Completed'}
                      </Chip>
                    </TableCell>
                    <TableCell>{formatTime(task.createdAt * 1000)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          onClick={() => viewPendingTaskDetails(task)}
                        >
                          View Details
                        </Button>
                        {task.status === EUserTaskCompletionStatus.UserTaskCompletionStatusPending && (
                          <Button
                            size="sm"
                            color="success"
                            variant="flat"
                            onClick={() => approveTask(task.id)}
                            isLoading={loading}
                          >
                            Approve
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <Button
                isDisabled={page === 1}
                onClick={() => setPage(page - 1)}
                variant="flat"
              >
                Previous
              </Button>
              <span className="mx-4 flex items-center">
                Page {page} of {Math.ceil(total / pageSize)}
              </span>
              <Button
                isDisabled={page >= Math.ceil(total / pageSize)}
                onClick={() => setPage(page + 1)}
                variant="flat"
              >
                Next
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Pending Task Details Modal */}
      <Modal isOpen={isPendingDetailsOpen} onOpenChange={onPendingDetailsOpenChange} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pending Task Details
              </ModalHeader>
              <ModalBody className="space-y-4">
                {selectedPendingTask && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Task ID</label>
                        <p className="text-sm">{selectedPendingTask.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">User ID</label>
                        <p className="text-sm">{selectedPendingTask.userId}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Task Title</label>
                      <p className="text-sm font-medium">{selectedPendingTask.taskTitle}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Submitted Content</label>
                      <div className="mt-1 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm whitespace-pre-wrap break-words">{selectedPendingTask.taskResult}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <div className="mt-1">
                          <Chip
                            color={selectedPendingTask.status === EUserTaskCompletionStatus.UserTaskCompletionStatusPending ? 'warning' : 'success'}
                            variant="light"
                            size="sm"
                          >
                            {selectedPendingTask.status === EUserTaskCompletionStatus.UserTaskCompletionStatusPending ? 'Pending' : 'Completed'}
                          </Chip>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-500">Submitted At</label>
                        <p className="text-sm">{formatTime(selectedPendingTask.createdAt)}</p>
                      </div>
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {selectedPendingTask?.status === EUserTaskCompletionStatus.UserTaskCompletionStatusPending && (
                  <Button 
                    color="success" 
                    onPress={() => selectedPendingTask && approveTask(selectedPendingTask.id)}
                    isLoading={loading}
                  >
                    Approve Task
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
