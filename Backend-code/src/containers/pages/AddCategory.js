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
import {addJobCategory} from '../../Apis/admin'

const AddCatgeory = ({ modalOpen, toggleModal,onSucess }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState(true);
    const setInput = (event) => {
        const {value} = event.target;
        setName(value);
        if(value.length > 0){
            setError(false);
        }else{
            setError(true);
        }
    };
    const addCategory = () => {
        addJobCategory(name).then(res => {
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
        <IntlMessages id="pages.add_category" />
      </ModalHeader>
      <ModalBody>
        <Label>
          <IntlMessages id="pages.add_category" />
        </Label>
        <Input placeholder="Catgegory Name" required value={name} onChange={(event) => setInput(event)}/>
        
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" outline onClick={toggleModal}>
          <IntlMessages id="pages.cancel" />
        </Button>
        <Button color="primary" disabled={error} onClick={addCategory}>
          <IntlMessages id="pages.submit" />
        </Button>{" "}
      </ModalFooter>
    </Modal>
  );
};

export default AddCatgeory;