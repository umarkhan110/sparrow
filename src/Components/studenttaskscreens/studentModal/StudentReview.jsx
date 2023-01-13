import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';

const StudentReview = (props) => {

    // props.reviewStudent
  return (
    <div>
         <Modal
            size="lg"
            show={props.modalValue}
            onHide={props.onClose}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
                <Modal.Title className='ml-5' id="example-modal-sizes-title-lg">
                    Student <span className='green'>Reviews</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='studentDetailModalBody'>
                {/* <div className='ratingComment'>
                    <div className='ratingCommentHed'>
                        <div><img className='commentImg' src="/assets/images/customerDashboard/unsplash_FcLyt7lW5wg.png" alt="" /></div>
                        <div>
                            <p className='aboutMainhed'>Ava</p>
                            <div className='setComentHed'>
                                <p className='aboutMainCC'>Babysitting</p>
                                <p className='setCommntContent aboutContent'> <span><img src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span> 5.0</p>
                            </div>
                        </div>
                    </div>
                    <p className='aboutContent'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span className='green'> View More</span></p>
                    <p className='publishP'>Publish 3 days ago</p>
                </div> */}
                
                <div>
                    {props?.reviewStudent.map((singleReview) => {
                        return (
                            <div className='ratingComment'>
                                <div className='ratingCommentHed'>
                                    <div><img className='commentImg' src="/assets/images/customerDashboard/unsplash_FcLyt7lW5wg.png" alt="" /></div>
                                    <div>
                                        <p className='aboutMainhed'>{singleReview?.client?.first_name && singleReview?.client?.last_name ? singleReview?.client?.first_name + " " + singleReview?.client?.last_name.charAt(0).toUpperCase() : "Ava" }  </p>
                                        <div className='setComentHed'>
                                            <p className='aboutMainCC'>{singleReview?.task?.title}</p>
                                            <p className='setCommntContent aboutContent'> <span><img src="/assets/images/customerDashboard/Star 8.svg" alt="" /></span> {parseFloat((singleReview?.feedback?.responsibility + singleReview?.feedback?.performance + singleReview?.feedback?.communication + singleReview?.feedback?.attitude)/4).toFixed(1)}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='aboutContent'>{singleReview?.task?.description ? singleReview?.task?.description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<span className='green'> View More</span>"}</p>
                                <p className='publishP'>Publish <Moment fromNow>{singleReview?.feedback?.updated_at}</Moment></p>
                            </div>
                        )
                    })}
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onClose}> Close </Button>
                {/* <Button form='updateStudentForm' className={classForSubmit}   type="submit">Update</Button> */}
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default StudentReview