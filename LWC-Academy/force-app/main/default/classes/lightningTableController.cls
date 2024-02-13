public with sharing class lightningTableController {
    @AuraEnabled
    public static List<Contact> getContacts() {
        try{
            List<Contact> lstContacts = [SELECT id, FirstName, LastName, Email, Phone FROM Contact LIMIT 100];
            return lstContacts;
        }catch(Exception e){
            System.debug(e.getMessage());
            throw e;
        }
    }
    @AuraEnabled
    public static boolean deleteContact(string elementId) {
        try {
            List<Contact> removedCont = [SELECT id, FirstName FROM Contact WHERE id = :elementId];
            System.debug(removedCont);
            delete removedCont;
            return true;
        } catch(Exception e){
            System.debug(e.getMessage());
            throw e;
        }
        
        

    }
}