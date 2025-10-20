import { useState, useEffect, useCallback } from 'react';
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { Button } from '@nextui-org/react';
import { Input } from '@nextui-org/react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { Chip } from '@nextui-org/react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { inviteCodeApi } from '@/routes/pages/Admin/adminApi';

interface InviteCode {
  id: number;
  code: string;
  available: boolean;
  createdAt: number;
  updatedAt: number;
}

export const InviteCodeManagement = () => {
  const [inviteCodes, setInviteCodes] = useState<InviteCode[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  
  // Generate invite code modal
  const { isOpen: isGenerateOpen, onOpen: onGenerateOpen, onOpenChange: onGenerateOpenChange } = useDisclosure();
  const [generateForm, setGenerateForm] = useState({
    num: 1,
    code: '',
  });

  // Load invite code list
  const loadInviteCodes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await inviteCodeApi.getList(page, pageSize);
      if (response.code === '200') {
        setInviteCodes(response.list);
        setTotal(parseInt(response.total));
      }
    } catch (error) {
      console.error('Failed to load invite code list:', error);
      setMessage('Failed to load invite code list');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  // Generate invite codes
  const generateInviteCodes = async () => {
    try {
      setLoading(true);
      const response = await inviteCodeApi.generate(
        generateForm.num,
        generateForm.code || undefined
      );
      if (response.code === '200') {
        setMessage(`Successfully generated ${generateForm.num} invite codes`);
        onGenerateOpenChange();
        setGenerateForm({ num: 1, code: '' });
        loadInviteCodes();
      } else {
        setMessage(response.msg || 'Generation failed');
      }
    } catch (error) {
      console.error('Failed to generate invite codes:', error);
      setMessage('Failed to generate invite codes');
    } finally {
      setLoading(false);
    }
  };

  // Update invite code status
  const updateInviteCodeStatus = async (id: number, available: boolean) => {
    try {
      setLoading(true);
      const response = await inviteCodeApi.update(id, available);
      if (response.code === '200') {
        setMessage('Invite code status updated successfully');
        loadInviteCodes();
      } else {
        setMessage(response.msg || 'Update failed');
      }
    } catch (error) {
      console.error('Failed to update invite code status:', error);
      setMessage('Failed to update invite code status');
    } finally {
      setLoading(false);
    }
  };

  // Format time
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('en-US');
  };

  useEffect(() => {
    loadInviteCodes();
  }, [page, loadInviteCodes]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Invite Code Management</h3>
          <Button color="primary" onPress={onGenerateOpen}>
            Generate Invite Code
          </Button>
        </CardHeader>
        <CardBody>
          {/* Invite Code List */}
          <Table aria-label="Invite Code List">
            <TableHeader>
              <TableColumn>ID</TableColumn>
              <TableColumn>Invite Code</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Created At</TableColumn>
              <TableColumn>Updated At</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {inviteCodes?.map((inviteCode) => (
                <TableRow key={inviteCode.id}>
                  <TableCell>{inviteCode.id}</TableCell>
                  <TableCell className="font-mono">{inviteCode.code}</TableCell>
                  <TableCell>
                    <Chip
                      color={inviteCode.available ? 'success' : 'danger'}
                      variant="flat"
                    >
                      {inviteCode.available ? 'Available' : 'Disabled'}
                    </Chip>
                  </TableCell>
                  <TableCell>{formatTime(inviteCode.createdAt)}</TableCell>
                  <TableCell>{formatTime(inviteCode.updatedAt)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      color={inviteCode.available ? 'danger' : 'success'}
                      variant="flat"
                      onClick={() => updateInviteCodeStatus(inviteCode.id, !inviteCode.available)}
                      isLoading={loading}
                    >
                      {inviteCode.available ? 'Disable' : 'Enable'}
                    </Button>
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

          {/* Message Display */}
          {message && (
            <div className={`mt-4 p-3 rounded-md ${
              message.includes('successful') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {message}
            </div>
          )}
        </CardBody>
      </Card>

      {/* Generate Invite Code Modal */}
      <Modal isOpen={isGenerateOpen} onOpenChange={onGenerateOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Generate Invite Code</ModalHeader>
              <ModalBody>
                <Input
                  type="number"
                  label="Quantity"
                  placeholder="Enter the number of invite codes to generate"
                  value={generateForm.num.toString()}
                  onChange={(e) => setGenerateForm(prev => ({ 
                    ...prev, 
                    num: parseInt(e.target.value) || 1 
                  }))}
                  min={1}
                  max={100}
                />
                <Input
                  label="Custom Invite Code (Optional)"
                  placeholder="Enter custom invite code"
                  value={generateForm.code}
                  onChange={(e) => setGenerateForm(prev => ({ 
                    ...prev, 
                    code: e.target.value 
                  }))}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={generateInviteCodes} isLoading={loading}>
                  Generate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
