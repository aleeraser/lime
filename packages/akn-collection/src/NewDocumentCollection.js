/*
 * Copyright (c) 2014 - Copyright holders CIRSFID and Department of
 * Computer Science and Engineering of the University of Bologna
 *
 * Authors:
 * Monica Palmirani – CIRSFID of the University of Bologna
 * Fabio Vitali – Department of Computer Science and Engineering of the University of Bologna
 * Luca Cervone – CIRSFID of the University of Bologna
 *
 * Permission is hereby granted to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The Software can be used by anyone for purposes without commercial gain,
 * including scientific, individual, and charity purposes. If it is used
 * for purposes having commercial gains, an agreement with the copyright
 * holders is required. The above copyright notice and this permission
 * notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * Except as contained in this notice, the name(s) of the above copyright
 * holders and authors shall not be used in advertising or otherwise to
 * promote the sale, use or other dealings in this Software without prior
 * written authorization.
 *
 * The end-user documentation included with the redistribution, if any,
 * must include the following acknowledgment: "This product includes
 * software developed by University of Bologna (CIRSFID and Department of
 * Computer Science and Engineering) and its authors (Monica Palmirani,
 * Fabio Vitali, Luca Cervone)", in the same place and form as other
 * third-party acknowledgments. Alternatively, this acknowledgment may
 * appear in the software itself, in the same form and location as other
 * such third-party acknowledgments.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * This view is used as wizard window to creating document collections
 */

Ext.define('AknCollection.NewDocumentCollection', {

    extend : 'Ext.window.Window',

    requires : ['LIME.view.DocumentMarkingLanguageSelector',
                'LIME.view.DocumentTypeSelector',
                'LIME.view.DocumentLangSelector',
                'LIME.view.LocaleSelector',
                'LIME.view.modal.newOpenfile.ListFilesPanel',
                'AknCollection.NewDocumentCollectionDropGrid'],

    alias : 'widget.newDocumentCollection',

    layout : 'card',

    draggable : true,

    border : false,

    modal : true,

    avoidTitleUpdate: true,

    width : 605,

    /**
     * Return the data set in the view
     * @return {Object} An object containing the key-value pairs in the form
     */
    getData : function() {
        var form = this.down('form[itemId=step1]').getForm();
        if (!form.isValid())
            return null;
        return form.getValues(false, false, false, true);
    },

    setData: function(data) {
        var form = this.down('form[itemId=step1]').getForm();
        form.setValues(data);
    },

    initComponent: function() {
        this.title = Locale.getString("newCollectionText", "akn-collection"),
        this.items = [{

            itemId : 'step1',
            xtype : 'form',
            frame : true,
            padding : '10px',
            layout : 'anchor',
            defaults : {
                anchor : '100%'
            },

            // The fields
            defaultType : 'textfield',
            items : [{
                xtype : 'docMarkingLanguageSelector',
                cls : 'syncTypeCollection'
            }, {
                xtype : 'docTypeSelector',
                hidden: true,
                value: 'documentCollection'
            }, {
                xtype : 'docLocaleSelector',
                hidden : true
            }, {
                xtype : 'docLangSelector'
            }],

            // The buttons
            dockedItems : [{
                xtype : 'toolbar',
                dock : 'bottom',
                ui : 'footer',

                items : ['->', {
                    xtype : 'button',
                    cls: 'addDocuments',
                    minWidth : 100,
                    handler: function(cmp) {
                        var activated = cmp.up('window').getLayout().setActiveItem('step2');
                        if (activated) {
                            // warn children about activation
                            Ext.each(activated.items.items, function(cmp) {
                                cmp.fireEvent("activated", cmp);
                            });
                        }
                    },
                    text : Locale.getString("addDocuments", "akn-collection")
                }]
            }]
        }, {
            itemId : 'step2',
            xtype : 'panel',
            frame : true,
            items : [{
                xtype : 'listFilesPanel',
                margin : '0 0 5 0',
                height : 200
            },{
                xtype : 'panel',
                cls : 'dropArea',
                minHeight : 150,
                border : 0,
                items : [{
                    xtype: 'newDocumentCollectionDropView'
                }]
            }],
            // The buttons
            dockedItems : [{
                xtype : 'toolbar',
                dock : 'bottom',
                ui : 'footer',
                items : ['->', {
                    xtype : 'button',
                    cls: 'createDocumentCollection',
                    minWidth : 100,
                    text : Locale.getString("ok")
                }]
            }]
        }];

        this.callParent();
    }
});
