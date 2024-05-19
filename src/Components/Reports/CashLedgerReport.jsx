import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import WFW_Banner from "../../assets/images/update_WFW_image.png";

// Import the font files
import RegularFont from "../../assets/fonts/Roboto-Regular.ttf";
import BoldFont from "../../assets/fonts/Roboto-Bold.ttf";
import { useEffect } from "react";
import moment from "moment";

// Register the fonts
Font.register({
  family: "CustomFont",
  fonts: [
    { src: RegularFont, fontWeight: "normal" },
    { src: BoldFont, fontWeight: "bold" },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  image: {
    width: "110%",
    height: "150px",
    margin: 5,
  },
  header: {
    paddingVertical: "5px",
    fontSize: "12px",
    paddingTop: "3px",
    fontWeight: "700",
  },
  cell: {
    fontWeight: "normal",
    fontSize: "12px",
    paddingTop: "3px",
    paddingLeft: "5px",
  },

  accountInfoWrraper: {
    width: "220px",
    marginTop: 20,
    borderBottom: "2px solid gray",
  },
  accountInfoCard: {
    width: "220px",
    paddingVertical: 3,
    display: "flex",
    flexDirection: "row",
  },
  accountInfoTitle: {
    // fontFamily: "CustomFont",
    fontWeight: "bold",
    fontSize: "13px",
    width: "120px",
    textAlign: "right",
    paddingRight: 3,
  },
  accountInfo: {
    width: "100px",
    // fontFamily: "CustomFont",
    fontWeight: "normal",
    fontSize: "13px",
    textAlign: "right",
  },
  accountGrandWrraper: {
    width: "220px",
    paddingVertical: 5,
  },
});

// Create Document Component
function CashLedgerReport(props) {
  return (
    <Document>
      {/*render a single page*/}
      <Page size="A4" style={styles.page}>
        {/* ************************************** */}
        {/* Header */}
        {/* ************************************** */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          fixed
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "10px",
            }}
          >
            Developed By: Zain Ul Basit
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "10px",
            }}
          >
            Email: zainulbasit486@gmail.com
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginVertical: 20,
          }}
        >
          <Image src={"./icd.png"} style={styles.image} />
        </View>
        {/* ************************************** */}
        {/* Bottom Line */}
        {/* ************************************** */}

        {/* ************************************** */}
        {/* Bill Detail */}
        {/* ************************************** */}
        <View
          style={{
            marginVertical: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Side */}
          <View>
            <Text
              style={{
                // fontFamily: "CustomFont",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {props.cName}
            </Text>
            <Text
              style={{
                // fontFamily: "CustomFont",
                fontWeight: "normal",
                fontSize: 13,
              }}
            >
              {props.cContact}
            </Text>
            <Text
              style={{
                // fontFamily: "CustomFont",
                fontWeight: "normal",
                fontSize: 13,
              }}
            >
              {props.cAddress}
            </Text>
          </View>
          {/* Right Side */}
          <View>
            {/* Invoice Number */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "190px",
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  // fontFamily: "CustomFont",
                  fontWeight: "bold",
                  fontSize: 13,
                  width: "110px",
                }}
              >
                Invoice #:
              </Text>
              <Text
                style={{
                  // fontFamily: "CustomFont",
                  fontWeight: "normal",
                  fontSize: 13,
                  paddingLeft: 3,
                }}
              >
                {props.bBillNo}
              </Text>
            </View>
            {/* Bill Date */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "190px",
              }}
            >
              <Text
                style={{
                  textAlign: "right",
                  // fontFamily: "CustomFont",
                  fontWeight: "bold",
                  fontSize: 13,
                  width: "110px",
                }}
              >
                Date:
              </Text>
              <Text
                style={{
                  // fontFamily: "CustomFont",
                  fontWeight: "normal",
                  fontSize: 13,
                  paddingLeft: 3,
                }}
              >
                {props.bDate}
              </Text>
            </View>
          </View>
        </View>
        {/* Body */}
        <View style={{ flex: 9 }}>
          {/* Table Header */}
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "2px solid #032248",
            }}
            fixed
          >
            {Columns.map((column) => (
              <Text style={{ ...styles.header, minWidth: column.minWidth }}>
                {column.label}
              </Text>
            ))}
          </View>
          {/* Table Data */}
          {props.Data.map((data) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "1px solid black",
                marginBottom: "2px",
                paddingTop: "4px",
                paddingBottom: "4px",
              }}
            >
              {Columns.map((column) => (
                <Text
                  style={{
                    ...styles.cell,
                    width: column.minWidth,
                    textAlign: column.align || "left",
                  }}
                >
                  {typeof data[column.id] === "number"
                    ? data[column.id].toLocaleString()
                    : data[column.id]}
                </Text>
              ))}
            </View>
          ))}

          <View
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <View style={styles.accountInfoWrraper}>
              <View style={styles.accountInfoCard}>
                <Text style={styles.accountInfoTitle}>Current Total: </Text>
                <Text style={styles.accountInfo}>{props.cTotal}/-</Text>
              </View>

              <View style={styles.accountInfoCard}>
                <Text style={styles.accountInfoTitle}>Discount: </Text>
                <Text style={styles.accountInfo}>-{props.cDiscount}/-</Text>
              </View>
              <View style={styles.accountInfoCard}>
                <Text style={styles.accountInfoTitle}>Paid: </Text>
                <Text style={styles.accountInfo}>-{props.cPaid}/-</Text>
              </View>
              <View style={styles.accountInfoCard}>
                <Text style={styles.accountInfoTitle}>Return: </Text>
                <Text style={styles.accountInfo}>-{props.cReturn}/-</Text>
              </View>
            </View>
            <View style={styles.accountGrandWrraper}>
              <View style={styles.accountInfoCard}>
                <Text style={styles.accountInfoTitle}>Remaining: </Text>
                <Text style={styles.accountInfo}>{props.cRemaining} /-</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
export default CashLedgerReport;

// Sample Columns data
const Columns = [
  {
    id: "date",
    label: "Date",
    minWidth: 60,
  },
  {
    id: "depositor",
    label: "Depositor",
    minWidth: 120,
  },
  {
    id: "payment_type",
    label: "Type",
    minWidth: 40,
  },
  {
    id: "bank_name",
    label: "Bank",
    minWidth: 100,
  },

  {
    id: "amount",
    label: "Amount",
    align: "left",
    minWidth: 70,
  },
  {
    id: "desc",
    label: "Description",
    minWidth: 130,
  },
];
