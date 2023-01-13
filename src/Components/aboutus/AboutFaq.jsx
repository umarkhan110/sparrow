import React from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function AboutFaq() {
    return (
        <div className='faq'>
            <div className='profileHead mb-5'>
                <h2>Frequently Asked <span className='green'>Questions</span></h2>
            </div>
            {/* <div className='faqBtnDiv'>
                <div className="faqSearchBtn">
                    <input type="text" className='faqSearchBtnField' placeholder='Search' />
                    <button className="taskbutton primary" >Find FAQ's</button>
                </div>
            </div> */}
            <div className='faqSec'>
                <Container>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header> <p> What is Sparrow?</p></Accordion.Header>
                            <Accordion.Body className='px-4'>
                                <p>
                                    Sparrow is an online marketplace that connects freelance labor of college students with local demand, allowing clients to get an extra hand with everyday tasks. College students face great responsibilities with academics, work, social life, and athletic commitments. Many students can not fully commit to their academics and are often compelled to prioritize work in order to attend college. Over 70% of college students rely on a job to finance their education with living expenses, tuition, and student debt at a record high. It is not only complicated for students to find flexible work that aligns with their schedule, but most available jobs pay only minimum wage. Thus, Sparrow intends to support and help every college student obtain academic success by making work more flexible. 
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header> <p>Why should I trust Sparrow?</p></Accordion.Header>
                            <Accordion.Body className='px-4'>
                                <p>
                                    Sparrow performs an optimal vetting process of all students and clients to ensure a safe and trustworthy experience for everyone on the platform. We perform an identity and criminal background check of every student and client on the platform. Students are also verified by their college and will only be allowed to sign up using their school email. Consequently, students who are found in misconduct violation per Sparrow’s policy will be banned from the platform and will be unable to sign up again. This allows us to always connect local families with qualified and trustworthy college students. We take the security of user information seriously and ensure all sensitive information like your full name and address is handled carefully in accordance with our Privacy Policy.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header> <p>What makes Sparrow different from comparison sites?</p></Accordion.Header>
                            <Accordion.Body className='px-4'>
                                <p>
                                Sparrow is exclusively built for college students to work on the platform. We are committed to help college students find flexible work to successfully finance their academics and lower student debt while also helping their local community. Our mission is to help all our students succeed by allowing them flexibility between school and work. 
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header> <p>How does the platform work?</p></Accordion.Header>
                            <Accordion.Body className='px-4'>
                                <p>
                                After signing up and creating a profile, clients will be able to create their specific tasks. The task can either be a one-time or reoccuring job that could be repeated every week. The client can search and invite multiple candidates for each task. Once a suitable student accepts the offer, both parties will get in direct contact through the platform to arrange further details about the time, place, etc. The student will be paid by the client only after the task has been completed.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header> <p>Who can sign up for Sparrow?</p></Accordion.Header>
                            <Accordion.Body className='px-4'>
                                <p>
                                Our platform is exclusively built for college student laborers. However, any and all interested individuals can become clients and sign up to hire a student and get help with any task. Clients will have the gratification of knowing that by participating through Sparrow, they are supporting the students of their local colleges and universities.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="5">
                            <Accordion.Header> <p>How do I improve chances of getting picked by a client?</p></Accordion.Header>
                            <Accordion.Body className='px-4'>
                                <p>
                                Clients are looking for the most suitable student laborer for the task. Students must ensure to thoroughly and accurately complete their student profile. Timeliness and promptness of responses will help a student secure more tasks quicker. Encouragement of positive reviews posted via Sparrow should be highly encouraged. Any and all tasks that you feel accomplished at completing, will make you more marketable.
                                </p>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Container>
                <div>
                    <Link to="/signInRoute/faq" className='primary viewAllbtn'>Load More</Link>
                </div>
            </div>
        </div>
    )
}

export default AboutFaq