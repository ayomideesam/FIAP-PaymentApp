import {EventEmitter, Injectable, Renderer2, RendererFactory2} from '@angular/core';

declare const pdfMake: any;
@Injectable({providedIn: 'root'})
export class CSVService {
  static options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: true,
    showTitle: true,
    useBom: true
  };
  private headers: string[] = [];
  data: any[] = [];
  private fileName = 'data.csv';
  private onError = new EventEmitter<Error>();
  private renderer: Renderer2;
  private waterMark = 'Fiap-Upperlink.ng';
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

  }

  downloadCsvFormatForReports(reports: Array<any>, fileName: any, callback: any) {
    const data: any = [];
    const name = `${fileName} as at ${new Date().toTimeString()}.csv`;
    reports.forEach((report, index) => {
      const myReport = {
        S_N: index + 1,
        UNIQUE_ID: (report.UNIQUE_ID) ? report.UNIQUE_ID.toString() : report._id,
        BENEFICIARY_NAME: report.BENEFICIARY_NAME,
        VERIFIED_BENEFICIARY_NAME: report.VERIFIED_BENEFICIARY_NAME,
        BENEFICIARY_ADDRESS: report.BENEFICIARY_ADDRESS,
        VERIFICATION_INSTITUTE: report.VERIFICATION_INSTITUTE,
        VERIFICATION_LOCATION: report.VERIFICATION_LOCATION,
        BANK_NAME: report.BANK_NAME,
        BANK_CODE: report.BANK_CODE,
        BVN: (report.bvn_source === 'USER') ? (report.BVN)  ? report.BVN.toString() : ' ' : '',
        PHONE_NUMBER: (report.PHONE_NUMBER) ? report.PHONE_NUMBER.toString() : '',
        ACCOUNT_NUMBER: (report.ACCOUNT_NUMBER) ? report.ACCOUNT_NUMBER.toString() : '',
        STATUS: report.STATUS,
        VERIFICATION_DATE: report.VERIFICATION_DATE,
        REASON: report.REASON
      };
      data.push(myReport);
    });
    this.data = data;
    this.fileName = name;
    this.generateCsv(callback);
  }
  downloadCsvFormatForFinalReports(reports: Array<any>, fileName: any, callback: any) {
    const data: any = [];
    const name = `${fileName} as at ${new Date().toTimeString()}.csv`;
    reports.forEach((report, index) => {
      const myReport = {
        S_N: index + 1,
        CUSTOMER_NAME: report.CUSTOMER_NAME,
        VERIFYING_INSTITUTION: report.VERIFYING_INSTITUTION,
        VERIFICATION_LOCATION: report.VERIFICATION_LOCATION,
        BANK_CODE: report.BANK_CODE,
        BVN: (report.BVN)  ? report.BVN.toString() : ' ',
        VERIFICATION_DATE: report.VERIFICATION_DATE
      };
      data.push(myReport);
    });
    this.data = data;
    this.fileName = name;
    this.generateCsv(callback);
  }
  private generateCsv(callback: any) {
    if (!this.data.length) {
      this.onError.emit(new Error('Data not available.'));
      return;
    }
    // console.log('this.data= ', this.data);
    let tabText = '';
    const keys = Object.keys(this.data[0]);
    if (!this.headers.length) {
      // if no headers are passed, use data keys for headers
      this.headers = keys;
    }
    // console.log('this.headers= ', this.headers);
    this.headers.forEach(h => {
      tabText += '"' + h + '",';
    });

    if (tabText.length > 0) {
      tabText = tabText.slice(0, -1);
      tabText += '\r\n';
    }

    this.data.forEach(d => {
      keys.forEach(k => {
        if (d.hasOwnProperty(k) && d[k] != null) {
          tabText += '"' + d[k] + '",';
        } else {
          tabText += '"",';
        }
      });

      tabText = tabText.slice(0, -1);
      tabText += '\r\n';
    });
    // console.log('tabText', tabText);
    this.generateCsvDownloader(tabText, callback);
  }

  private generateCsvDownloader(data: any, callback: any) {
    if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE workaround
      const blob = new Blob([data]);
      window.navigator.msSaveOrOpenBlob(blob, this.fileName);
    } else {
      const anchor = this.renderer.createElement('a');
      const t = this.renderer.createText('download');
      this.renderer.appendChild(anchor, t);
      this.renderer.setStyle(anchor, 'visibility', 'hidden');
      this.renderer.setAttribute(anchor, 'href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(data));
      this.renderer.setAttribute(anchor, 'target', '_blank');
      this.renderer.setAttribute(anchor, 'download', this.fileName);
      /*const parent = this.renderer.selectRootElement('#downloadCsv');
      // console.log('parent=', parent);*/
      this.renderer.appendChild(document.body, anchor);
      setTimeout(() => {
        anchor.click();
        anchor.remove();
        callback();
      }, 51);
    }
  }


}
