import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label
} from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import {tags} from '../../Apis/admin'

const AddCatgeory = ({ modalOpen, toggleModal,onSucess }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(true);
    const setInput = () => {
        if(name !==""){
            setError(false);
        }else{
            setError(true);
        }
    };
    const addAds = () => {
        tags({name}).then(res => {
        const {data} = res.data;
        setName(""); 
        onSucess({
            id:data,
            name
        });   
        }).catch(err => {
            console.log(err);
        });
        
    };
  return (
    <Modal
      isOpen={modalOpen}
      toggle={toggleModal}
      wrapClassName="modal-right"
      backdrop="static"
    >
      <ModalHeader toggle={toggleModal}>
        Tags
      </ModalHeader>
      <ModalBody>
        <Label>
          Tags
        </Label>
        <Input placeholder="Name" required value={name} onChange={(event) => {setName(event.target.value); setInput()}}/>
       
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" disabled={error} onClick={addAds}>
          <IntlMessages id="Save" />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddCatgeory;