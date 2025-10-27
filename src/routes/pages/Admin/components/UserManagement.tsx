// /socialtask/api/v1/admin/user/delete post { userId: number }

import { useState } from "react";
import { toast } from "react-toastify";
import { adminUserApi } from "../adminApi";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";

export const UserManagement = () => {
    const [userId, setUserId] = useState<string | undefined>(undefined);


    const deleteUser = async () => {
        if (!userId) return;
        const response = await adminUserApi.deleteUser(parseInt(userId));
        if (response.code === '200') {
            toast.success('User deleted successfully');
        } else {
            toast.error(response.msg || 'Delete failed');
        }
    };
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">User Management</h3>
                </CardHeader>
                <CardBody className="space-y-4">
                    <Input label="User ID" value={userId} onValueChange={setUserId} />
                    <Button color="danger" onClick={deleteUser}>Delete</Button>
                </CardBody>
            </Card>
        </div>
    );
};