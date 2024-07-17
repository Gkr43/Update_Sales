/*global QUnit*/

sap.ui.define([
	"update_sales/controller/Update_sales.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Update_sales Controller");

	QUnit.test("I should test the Update_sales controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
