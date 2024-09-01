import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import useQuery from "@/hooks/useQuery";
import useMutate from "@/hooks/useMutate";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSecureStorage from "@/hooks/useSecureStorage";

type AssignClient = {
    client_id?: number;
    user_id?: number;
};

const ClientPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [assignClient, setAssignClient] = useState<AssignClient>({ client_id: 0, user_id: 0 });
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const adminCodeInput = useRef<HTMLInputElement>(null);
    const { get } = useSecureStorage();

    const { data: clients, isLoading, isFetching } = useQuery(`clients?page=${currentPage}`);

    const assignOnSuccess = () => {
        setIsDialogOpen(false); // Close the dialog after successful assignment
    };

    const [submitAssign, { isLoading: assignLoading }] = useMutate({ callback: assignOnSuccess, navigateBack: false });

    const handleAssignClient = async () => {
        const formData = new FormData();
        formData.append('code', adminCodeInput.current?.value || "");
        formData.append('client_id', assignClient.client_id?.toString() || "");

        await submitAssign("assign-client", formData);
    };

    const isSuperAdmin = get('auth-type') === 'super-admin';

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="h-full flex-1 items-start gap-4 px-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto flex-1 auto-rows-max grid grid-cols-1 gap-3">
                <div className="mt-8 min-h-full">
                    <div className="flex flex-col w-full min-h-full justify-between gap-4 px-28">
                        <div className="overflow-scroll">
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <Table divClassName="overscroll-y-scroll">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Client Name</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead><span className="sr-only">Actions</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {clients && clients.data.data.map((client: any) => (
                                            <TableRow key={client.id}>
                                                <TableCell className="font-medium">{client.name}</TableCell>
                                                <TableCell>{client.client_code}</TableCell>
                                                <TableCell>
                                                    {isSuperAdmin && <DialogTrigger asChild>
                                                        <Button
                                                            variant="default"
                                                            onClick={() => {
                                                                setAssignClient({ client_id: client.id, user_id: client.user_id });
                                                                setIsDialogOpen(true);
                                                            }}
                                                            disabled={!!client.user_id}
                                                            size="sm"
                                                        >
                                                            {client.user_id ? "Assigned" : "Assign"}
                                                        </Button>
                                                    </DialogTrigger>}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>Enter Admin Code</DialogTitle>
                                    </DialogHeader>
                                    <div className="flex items-center space-x-2">
                                        <div className="grid flex-1 gap-2">
                                            <Label htmlFor="link" className="sr-only">Link</Label>
                                            <Input
                                                id="link"
                                                defaultValue=""
                                                ref={adminCodeInput}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleAssignClient}
                                            disabled={assignLoading}
                                            type="button"
                                            size="sm"
                                            className="px-3"
                                        >
                                            Assign
                                        </Button>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <CardFooter className="h-1/6">
                            {clients && clients.data.data.length > 0 && (
                                <TablePagination
                                    url={clients.data.data.path}
                                    lastPage={clients.data.last_page}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    isFetching={isFetching}
                                />
                            )}
                        </CardFooter>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ClientPage;
