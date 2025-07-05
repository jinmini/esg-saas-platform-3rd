declare module 'html2pdf.js' {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: {
      type?: 'jpeg' | 'png' | 'webp';
      quality?: number;
    };
    html2canvas?: {
      scale?: number;
      useCORS?: boolean;
      letterRendering?: boolean;
    };
    jsPDF?: {
      unit?: 'pt' | 'mm' | 'cm' | 'in';
      format?: 'a3' | 'a4' | 'a5' | 'letter' | 'legal' | 'tabloid' | [number, number];
      orientation?: 'portrait' | 'landscape';
    };
  }

  interface Html2Pdf {
    set(options: Html2PdfOptions): Html2Pdf;
    from(element: HTMLElement): Html2Pdf;
    save(): Promise<void>;
    output(type?: 'blob' | 'bloburl' | 'dataurlstring' | 'dataurlnewwindow'): Promise<any>;
    outputPdf(): Promise<any>;
    then(callback: (pdf: any) => void): Html2Pdf;
  }

  function html2pdf(): Html2Pdf;
  export = html2pdf;
} 