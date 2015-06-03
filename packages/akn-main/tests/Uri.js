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

describe ('AknMain.Uri', function () {
    it ('"d/akn" -> Unexpected uri start: "d"', function () {
        var fn = function () { new AknMain.Uri('d/akn'); };
        expect(fn).toThrowError('Unexpected uri start: "d"');
    });

    it ('"/asdakn/it/..." -> Missing /akn/ start: "asdakn"', function () {
        var fn = function () { new AknMain.Uri('/asdakn/it/...'); };
        expect(fn).toThrowError('Missing /akn/ start: "asdakn"');
    });

    it ('"/akn/asdasdasd/..." -> Missing country: "asdasdasd"', function () {
        var fn = function () { new AknMain.Uri('/akn/asdasdasd/...'); };
        expect(fn).toThrowError('Missing country: "asdasdasd"');
    });

    it ('"/akn/it/asdasdasd/..." -> Invalid doc type: "asdasdasd"', function () {
        var fn = function () { new AknMain.Uri('/akn/it/asdasdasd/...'); };
        expect(fn).toThrowError('Invalid doc type: "asdasdasd"');
    });

    it ('"/akn/it/act/20122112/..." -> Invalid date: "20122112,..."', function () {
        var fn = function () { new AknMain.Uri('/akn/it/act/20122112/...'); };
        expect(fn).toThrowError('Invalid date: "20122112,..."');
    });

    it ('"/akn/dz/debaterecord/2004-12-21"', function () {
        var uriStr = '/akn/dz/debaterecord/2004-12-21';
        var uri = new AknMain.Uri(uriStr);
        expect(uri.country).toEqual('dz');
        expect(uri.type).toEqual('debaterecord');
        expect(uri.date).toEqual('2004-12-21');
        expect(uri.work()).toEqual(uriStr);
    });

    it ('"/akn/ke/act/decree/MinetryForeightAffairs/2005-07-12/3"', function () {
        var uriStr = '/akn/ke/act/decree/MinetryForeightAffairs/2005-07-12/3';
        var uri = new AknMain.Uri(uriStr);
        expect(uri.country).toEqual('ke');
        expect(uri.type).toEqual('act');
        expect(uri.subtype).toEqual('decree');
        expect(uri.author).toEqual('MinetryForeightAffairs');
        expect(uri.date).toEqual('2005-07-12');
        expect(uri.name).toEqual('3');
        expect(uri.work()).toEqual(uriStr);
    });

    it ('"/akn/ng/bill/2003-05-14/19/eng@first"', function () {
        var uriStr = '/akn/ng/bill/2003-05-14/19/eng@first';
        var uri = new AknMain.Uri(uriStr);
        expect(uri.country).toEqual('ng');
        expect(uri.type).toEqual('bill');
        expect(uri.date).toEqual('2003-05-14');
        expect(uri.language).toEqual('eng');
        expect(uri.version).toEqual('first');
        expect(uri.work()).toEqual('/akn/ng/bill/2003-05-14/19');
        expect(uri.expression()).toEqual(uriStr);
    });
});



