import { LightningElement , api} from 'lwc';

export default class SampleLightningForm extends LightningElement {
    @api record = {};
    @api displayModal;
    @api newRecord = false;
    @api columns = [];

    fieldValues = [];

    
    handleSuccess(event){
        console.log('Registro Actualizado ' , event.detail.fields);
        const successEvent = new CustomEvent("success", {
            detail: {
                record: event.detail.fields,
               
            }
        });
        this.dispatchEvent(successEvent);
    }
    
    @api 
    saveCurrentRecord(){

            const form = this.template.querySelector('lightning-record-edit-form');
            if (form) {
                form.submit();
            }
    }

    
}