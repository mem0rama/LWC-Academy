import getContacts from '@salesforce/apex/lightningTableController.getContacts';
import deleteContact from '@salesforce/apex/lightningTableController.deleteContact';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { LightningElement, api } from 'lwc';

export default class SampleLightningTable extends LightningElement {
    displayModal = false;
    lstContacts;
    title = "Contact Table";
    @api record;
    async connectedCallback(){
        try{
            await this.ObtainContacts();
        }catch(error){
            console.log(error.message);
            //throw error;
        }
    }
    actions = [
        {
            label: 'Edit',
            name: 'edit'
        },
        {
            label: 'Delete',
            name: 'delete'
        }
    ];
    @api columns = [
        { 
            label: 'Id',
            fieldName: 'Id'
        },
        {
            label: 'First Name', 
            fieldName: 'FirstName'
        },
        {
            label: 'Last Name', 
            fieldName: 'LastName'
        },
        {
            label: 'Email', 
            fieldName: 'Email'
        },
        {
            label: 'Phone', 
            fieldName: 'Phone'
        },
        {
            type: "action",
            typeAttributes: {rowActions: this.actions} 
        },
    ];
    data = [
        {
            name: 'John',
            lastName: 'Travolta',
        },
        {
            name: 'AMLO',
            lastName: 'Travolta',
        },
        {
            name: 'Juan',
            lastName: 'Escutia',
        }
    ];

     handleRowAction(event){
        const actionName = event.detail.action.name;
        const rowId = event.detail.row;
        console.log(actionName);
        console.log(rowId);
        
        switch(actionName){
            case 'edit':
                this.handleOpenModal();
                this.record = rowId;
                this.title = "Edit Record";
                break;
            case 'delete':
                this.deleteContactInfo(rowId.Id);

                break;
        }
    }

    async deleteContactInfo(Id){
        console.log(Id);
        try{
            const res = await deleteContact({elementId: Id});
            res == true ? this.handleUpdateSuccess() : this.showErrorToast();

        }catch(error){
            this.showErrorToast();
            console.log('Error:');
            console.log(error);
        }
        
    }

    handleOpenModal(){
        this.displayModal = true;
    }
    handleCloseModal(event) {
        const message = event.detail.flag;
        console.log(message);
        this.displayModal = message;

    }

    async handleUpdateSuccess(){
       
        try {
            await this.ObtainContacts();
            this.showToast();
            this.displayModal = false;

        } catch(error){
            this.showErrorToast();
            console.log(error.message);
        }
    }

    async ObtainContacts() {
        try{
            const Contacts = await getContacts();
            this.lstContacts = Contacts;
            console.log(this.lstContacts);
        }catch(error) {
            console.log(error.message);
            //throw error;
        }

        
    }

    showToast(){
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'Record updated',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
    showErrorToast(){
        const event = new ShowToastEvent({
            title: 'Error',
            message: 'Record  couldn`t be updated',
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
}