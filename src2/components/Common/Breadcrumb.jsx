import React,{useState} from "react"
import Link  from "next/link"
import { Row, Col, BreadcrumbItem } from "reactstrap"
// import BasicModal from "@/components/BasicModal";
// import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';


const Breadcrumb = (props) => {
  const [setting_Menu, setsetting_Menu] = useState(false)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Row className="align-items-center">
      <Col sm={6}>
        <div className="page-title-box">
          <h4 className="font-size-18">{props.breadcrumbItem}</h4>
          <ol className="breadcrumb mb-0">
            {
              (props.maintitle) ?
            <>
            <BreadcrumbItem>
              <Link href="/#">{props.maintitle}</Link>
            </BreadcrumbItem>
            </> : ''
            }
            <BreadcrumbItem>
              <Link href={(props.link)?props.link:""}>{props.title}</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>
              {props.breadcrumbItem}
            </BreadcrumbItem>
          </ol>
        </div>
      </Col>
      <Col sm={6}>
        <div className="float-end d-none d-md-block">
          
        </div>
      </Col>
    </Row>
  )
}

export default Breadcrumb;
