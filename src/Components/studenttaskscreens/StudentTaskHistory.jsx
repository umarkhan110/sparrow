import { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getStudentOrders } from '../../services/order/StudentOrderList';

import FooterNav from '../mobilefooternav/FooterNav';

const StudentTaskHistory = () => {
    const navigate = useNavigate()

    const [loder, setLoder] = useState(true);
    const std_id = parseInt(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id);

    const dataDummy = [
        {
            id: 1,
            student: 'Beetlejuice',
            task: 'Pet Sitting',
            sDate: 'May 16',
            eDate: 'Jun 18',
            status: 'Completed',
            payment: '$70'
        },
        {
            id: 2,
            student: 'Beetlejuice',
            task: 'Pet Sitting',
            sDate: 'May 16',
            eDate: 'Jun 18',
            status: 'Completed',
            payment: '$70'
        },
        {
            id: 3,
            student: 'Beetlejuice',
            task: 'Pet Sitting',
            sDate: 'May 16',
            eDate: 'Jun 18',
            status: 'Completed',
            payment: '$70'
        },

    ]

    const [orderList, setOrderList] = useState([]);
    // console.log(orderList)
    // console.log(orderList?.idF)
    // console.log(orderList)
    // getting orders list 
    const getOrderListFunc = async () => {
        // debugger
        const response = await getStudentOrders(std_id);

        if (response.status === 200) {
            setOrderList(response?.data?.orders);
            setLoder(false);
        } else {
            setOrderList(dataDummy);

            Swal.fire({
                title: response.data.message,
                timer: 1500,
                icon: "error",
                showConfirmButton: false,
            });
        }
    };

    useEffect(() => {
        getOrderListFunc()
    }, [])

    const columns = [
        {
            name: 'Family',
            button: true,
            cell: (row) => (
                <div className='studentHed'>
                    <div><img src={row?.client?.image} alt="" /></div>
                    <p>{row?.client?.first_name}</p>
                </div>
            ),
            width: "230px"
        },
        {
            name: 'Task',
            selector: row => row?.task?.title,
        },
        {
            name: 'Payment',
            selector: row => row?.total_paid,
        },
        {
            name: 'Start Date',
            selector: row => row?.task?.start_date,
        }
        ,
        {
            name: 'End Date',
            // selector: row => row.eDate,
            // width: '200px'
        }
        ,
        {
            name: 'Status',
            button: true,
            cell: (row) => (
                <div>
                    {/* {adding onClick={() => onRowClicked(row)} fucntion here just to add click functionality works also for buttons} */}
                    {
                        row?.status === "pending" ?
                            <button onClick={() => onRowClicked(row)} className='tableBtn ornage'>{row?.status}</button>
                            :
                            row?.status === "in progress" ?
                                <button onClick={() => onRowClicked(row)} className='tableBtn colorActive'>{row?.status}</button>
                                :
                                row?.status === "closed" ?
                                    <button onClick={() => onRowClicked(row)} className='tableBtn activeRed'>{row?.status}</button>
                                    :
                                    <button onClick={() => onRowClicked(row)} className='tableBtn'>{row?.status}</button>
                    }
                </div>
            ),
            width: '150px'
        }
    ];


    const customStyles = {
        headCells: {
            style: {
                fontSize: '18px',
                fontWeight: '600',
                color: '#000000',
                fontFamily: 'Manrope',
                backgroundColor: 'white',
                borderBottom: '1px solid #EDEDED',
                paddingTop: "19px !important",
                paddingBottom: "19px !important",
            },
        },
        cells: {
            style: {
                color: '#000000',
                fontSize: '14px',
                fontWeight: '400',
                fontFamily: 'Poppins',
                backgroundColor: '#fff',
                paddingTop: "12px !important",
                paddingBottom: "12px !important",
            },
        },
        headRow: {
            style: {
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '400',
                border: 'none !important'
            },
        },
    };

    const onRowClicked = (single_row) => {
        // sending order id
        navigate(`/dashboardRoute/chatStudent/student-task-descp/${single_row?.task_id}/${single_row?.id}`);
    }

    return (
        <div className='bgNotiLines'>
            <h2 className='text-center'>Task <span className='green'>History</span></h2>

            <Container>
                {
                    loder ? <div className="height100vh">
                        <div className="lds-spinner">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                        :
                        <div className='orderDataTable'>
                            <DataTable title="My Task History" customStyles={customStyles} columns={columns} data={orderList} onRowClicked={onRowClicked} />
                        </div>
                }
            </Container>
            <FooterNav />
        </div>
    )
}

export default StudentTaskHistory