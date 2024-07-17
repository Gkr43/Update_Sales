sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
	"sap/ui/model/Filter",
    "sap/m/MessageBox"
],
function (Controller,FilterOperator,Filter,MessageBox) {
    "use strict";

    return Controller.extend("updatesales.controller.Update_sales", {
        onInit: function () {
            debugger;
            this.oModel = this.getOwnerComponent().getModel();
           var oJSONModel = new sap.ui.model.json.JSONModel();
           this.OnExcellFileReadTable();

        },
        
       
        OnExcellFileReadTable: function(){
            debugger;
            var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var that=this;
            //  /ZCPR_UPDT
             oModel.read("/zcpr_vk11",{
                         success: function(response)
                         {
                             debugger;
                           //  oJSONModel.setData(oresponse);
                             oJSONModel.setData(response.results);
                             that.getView().setModel(oJSONModel,"localModel");
                            // that.getView().setModel(oJSONModel);
                             sap.m.MessageToast.show("Excell file Record Display Successfully");
                         }.bind(that),
                         error: function(error){
                            sap.m.MessageToast.show("Excell file Data Found");
                        }
                    });
                },
        
        onValueHelpPOAMNo:function(){
            debugger;
           var oModel = this.getOwnerComponent().getModel();
            var oJSONModel = new sap.ui.model.json.JSONModel();
            var that = this;
         //   this.oModel.read("/ZCPR_UPLOAD", /ZCPR_UPDT" {
                this.oModel.read("/ZCPR_UPDT", {
            
              success: function(response) {
                sap.m.MessageToast.show("Record Display Successfully");
               
                if(! that.fragment){
                that.fragment = new sap.ui.xmlfragment("Update_sales.fragments.update", that);  
            }
                that.getView().addDependent(that.fragment);
                var oJSONModel = new sap.ui.model.json.JSONModel();
               oJSONModel.setData(response.results);
                that.fragment.setModel(oJSONModel);
                that.fragment.open();
              },
              error: function(oErr) {
                sap.m.MessageToast.show("No Data Found");
              }
            });
        },
        
        onSearchPoamNo:function(oEvent){
            debugger;
            var sValue = oEvent.getParameter("value");
            var oFilter = new Filter("amdno", FilterOperator.Contains, sValue);
            var oBinding = oEvent.getParameter("itemsBinding");
            oBinding.filter([oFilter]);
        },
        
        onConfirmPoamNo:function(oEvent){
            debugger;
            var selectedItem = oEvent.getParameter("selectedItem").getTitle();
             var oTable = this.byId("uiTable");
             var oBinding = oTable.getBinding("rows").oList;
            if (selectedItem !== "") {
                var fil = [new sap.ui.model.Filter("amdno", "Contains", selectedItem)];

                oTable.getBinding('rows').filter(new sap.ui.model.Filter(fil, false));
                      } else {
           
            oTable.getBinding("rows").filter([]);
                      }
                      this.byId("POAMNumber").setValue(selectedItem);
    },

    //
    onSubmitPOAMNO: function(oEvent){
        debugger;
        //var selectedItem = oEvent.getParameter("selectedItem").getTitle();
        var value = oEvent.getSource().getValue();
        var oTable = this.byId("uiTable");
        var oBinding = oTable.getBinding("rows").oList;
       if (value !== "") {
           var fil = [new sap.ui.model.Filter("amdno", "Contains", value)];
           oTable.getBinding('rows').filter(new sap.ui.model.Filter(fil, false));
                 } else {

      
       oTable.getBinding("rows").filter([]);
                 }


    },

        onLiveChangePoamNO:function(Evt){
            debugger;
            var val = Evt.getParameter('value');
            if (val !== "") {
     var fil = [new sap.ui.model.Filter("amdno", "Contains", val)];
      this.fragment.getBinding('items').filter(new sap.ui.model.Filter(fil, false));
            } else {
            this.fragment.getBinding("items").filter([]);
            }

        },


        formatID: function(sStatus) {
            if (sStatus === "Pending") {
                return new sap.ui.core.Icon({
                    src: "sap-icon://status-in-process",
                    color: "yellow"
                }).addStyleClass("sapUiTinyMarginBeginEnd");
            } else if (sStatus === "Approved") {
                return new sap.ui.core.Icon({
                    src: "sap-icon://status-completed",
                    color: "green"
                }).addStyleClass("sapUiTinyMarginBeginEnd");
            } else {
                return sStatus;
            }
        }


    });
});

    
