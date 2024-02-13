import { LightningElement, api } from 'lwc';

export default class SampleModal extends LightningElement {
    @api modalTitle = "";
    @api infocolumns=[];
    @api rowFields = {};
    @api newRecord;
    handleCancelButton() {
        const event = new CustomEvent("cancel", {
            detail: {
                flag: false
            }
        });
        
        this.dispatchEvent(event);
    }

    handleSaveButton(event) {
        this.template.querySelector('c-sample-lightning-form').saveCurrentRecord();
        //this.dispatchEvent(e);
    }
    
}