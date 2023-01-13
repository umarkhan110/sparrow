import moment from 'moment';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getClientOrders } from '../../services/order/ClientOrderList';

const CustomerTaskHistory = ({ setTotaltasks }) => {

    const navigate = useNavigate()

    const [loder, setLoder] = useState(true);
    const client_id = parseInt(JSON.parse(localStorage.getItem('sparrowSignIn'))?.user?.id);

    const [orderList, setOrderList] = useState([]);
    // sending total tasks to parent
    setTotaltasks(orderList?.length)
    // getting orders list 
    const getOrderListFunc = async () => {
        // debugger
        const response = await getClientOrders(client_id);
        if (response.status === 200) {

            setOrderList(response?.data?.order);
            setLoder(false);
        } else {
            Swal.fire({
                title: response.data.message,
                timer: 1500,
                icon: "error",
                showConfirmButton: false,
            });

            setLoder(false);

        }
    };
    useEffect(() => {
        getOrderListFunc()
    }, [])
    // console.log(orderList);
    // react datatable
    const columns = [
        {
            name: 'Students',
            button: true,
            cell: (row) => (
                <div className='studentHed'>
                    {/* {console.log(row?.student?.image)} */}
                    <div><img src={row?.student?.image} alt="" /></div>
                    <p>{row?.student?.first_name}</p>
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
            selector: row => moment(row?.task?.start_date).format('L'),
        }
        ,
        {
            name: 'End Date',
            // width: '200px'
            cell: (row) => (
                <div className='studentHed'>
                    {row?.feedback?.created_at ? moment(row?.feedback?.created_at).format('L')
                        : ""
                    }
                </div>
            ),
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

    const onRowClicked = (order) => {
        // sending order id
        if (order.status === "in progress") {
            setTimeout(() => {
                navigate(`/dashboardRoute/customer-notification/order-details/${order.id}`);
            }, 100);
        } else {
            setTimeout(() => {
                navigate(`/dashboardRoute/customer-notification/task-details/${order.task_id}`);
            }, 100);
        }
    }

    return (
        <div className='orderDataTable'>
            {
                loder ? <div className="height100vh height10vh">
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
                </div> :
                    <DataTable title="My Task History" customStyles={customStyles} columns={columns} data={orderList} onRowClicked={onRowClicked} />
            }
        </div>
    )
}

export default CustomerTaskHistory