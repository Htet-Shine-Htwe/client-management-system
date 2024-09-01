import {
    CardFooter,
} from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { TablePagination } from "@/components/ui/table-pagination";
import useQuery from "@/hooks/useQuery";
import { useState } from "react";


const AdminPage = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);

    const { data: admins, isLoading, isFetching } = useQuery(`admins?page=${currentPage}`);

    if (isLoading) {
        // should handle loading with proper ui
        return <div>Loading...</div>
    }

    return (

        <main className="h-full flex-1 items-start gap-4 px-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto flex-1 auto-rows-max grid grid-cols-1 gap-3">
                <div className="mt-8 min-h-full">
                    <div className=" flex flex-col w-full min-h-full justify-between   gap-4 px-28">

                        <div className="overflow-scroll ">
                            <Table divClassName=" overscroll-y-scroll"

                                className="">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">
                                            <span className="">Name</span>
                                        </TableHead>
                                        <TableHead>
                                            Code
                                        </TableHead>

                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className="">
                                    {
                                        admins && admins?.data?.data.map((client: any) => (
                                            <TableRow key={client.id}>

                                                <TableCell className="font-medium">
                                                    {client.name}
                                                </TableCell>
                                                <TableCell>
                                                    {client.code}
                                                </TableCell>
                                                <TableCell>
                                                    
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </div>
                        <CardFooter className="h-1/6">
                            {
                                (admins && admins?.data?.data.length > 0) && <TablePagination url={admins.data.data.path} lastPage={admins.data.last_page} currentPage={currentPage} setCurrentPage={setCurrentPage} isFetching={isFetching} />
                            }
                        </CardFooter>
                    </div>
                </div>
            </div>
        </main>


    )
}

export default AdminPage