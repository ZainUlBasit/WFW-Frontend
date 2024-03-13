import { PDFDownloadLink } from "@react-pdf/renderer";
import CustomPDF from "./CustomPDF";

const Temp = () => {
  return (
    <PDFDownloadLink document={<CustomPDF />} fileName="custom.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Generating PDF..." : "Download PDF"
      }
    </PDFDownloadLink>
  );
};

export default Temp;
