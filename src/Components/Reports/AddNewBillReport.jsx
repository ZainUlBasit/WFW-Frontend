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
import RegularFont from "../../assets/fonts/Raleway-Regular.ttf";
import BoldFont from "../../assets/fonts/Raleway-Bold.ttf";
import { useEffect } from "react";

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
    paddingHorizontal: 30,
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
    width: "150px",
    height: "120px",
    margin: 5,
  },
  header1: {
    width: "240px",
    // color: "white",
    paddingVertical: "5px",
    paddingLeft: "5px",
    fontSize: "12px",
    paddingTop: "3px",
    fontWeight: "700",
  },
  header2: {
    width: "100px",
    paddingVertical: "5px",
    paddingLeft: "5px",
    fontSize: "12px",
    paddingTop: "3px",
  },
  header3: {
    width: "100px",
    paddingVertical: "5px",
    fontSize: "12px",
    paddingTop: "3px",
    paddingLeft: "5px",
  },
  header4: {
    width: "99px",
    paddingVertical: "5px",
    fontSize: "12px",
    paddingTop: "3px",
    paddingLeft: "5px",
  },
  cell1: {
    fontFamily: "CustomFont",
    fontWeight: "normal",
    width: "240px",
    fontSize: "12px",
    paddingTop: "3px",
    paddingLeft: "5px",
  },
  cell2: {
    fontFamily: "CustomFont",
    fontWeight: "normal",
    width: "100px",
    fontSize: "12px",
    paddingTop: "3px",
    paddingLeft: "5px",
    textAlign: "center",
  },
  cell3: {
    fontFamily: "CustomFont",
    fontWeight: "normal",
    width: "100px",
    fontSize: "12px",
    paddingTop: "3px",
    paddingLeft: "5px",
    textAlign: "center",
  },
  cell4: {
    fontFamily: "CustomFont",
    fontWeight: "normal",
    width: "100px",
    fontSize: "12px",
    paddingTop: "3px",
    paddingLeft: "5px",
    textAlign: "center",
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
    fontFamily: "CustomFont",
    fontWeight: "bold",
    fontSize: "13px",
    width: "120px",
    textAlign: "right",
    paddingRight: 3,
  },
  accountInfo: {
    width: "100px",
    fontFamily: "CustomFont",
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
function AddNewBillReport(props) {
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
              fontFamily: "CustomFont",
              fontWeight: "bold",
              fontSize: "10px",
            }}
          >
            Developed By: Zain Ul Basit
          </Text>
          <Text
            style={{
              fontFamily: "CustomFont",
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
            marginVertical: 30,
          }}
        >
          <Image src={WFW_Banner} style={styles.image} />
          <View>
            <Text
              style={{
                fontFamily: "CustomFont",
                fontWeight: "bold",
                fontSize: 25,
                marginBottom: 15,
              }}
            >
              INVOICE
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontWeight: "bold",
                  fontSize: 15,
                }}
              >
                Irshad Carton Dealer
              </Text>
              <Text
                style={{
                  fontFamily: "CustomFont",
                  fontWeight: "normal",
                  fontSize: 13,
                }}
              >
                {`Swat, KPK,\nPakistan`}
              </Text>
            </View>
          </View>
        </View>
        {/* ************************************** */}
        {/* Bottom Line */}
        {/* ************************************** */}
        <View
          style={{
            width: "100%",
            height: "2px",
            backgroundColor: "#032248",
            marginTop: "10px",
          }}
        ></View>
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
                fontFamily: "CustomFont",
                fontWeight: "bold",
                fontSize: 13,
              }}
            >
              {props.cName}
            </Text>
            <Text
              style={{
                fontFamily: "CustomFont",
                fontWeight: "normal",
                fontSize: 13,
              }}
            >
              {props.cContact}
            </Text>
            <Text
              style={{
                fontFamily: "CustomFont",
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
                  fontFamily: "CustomFont",
                  fontWeight: "bold",
                  fontSize: 13,
                  width: "110px",
                }}
              >
                Invoice #:
              </Text>
              <Text
                style={{
                  fontFamily: "CustomFont",
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
                  fontFamily: "CustomFont",
                  fontWeight: "bold",
                  fontSize: 13,
                  width: "110px",
                }}
              >
                Date:
              </Text>
              <Text
                style={{
                  fontFamily: "CustomFont",
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
          {/* Table */}
          <View
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            {/* Row Header */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                borderBottom: "2px solid #032248",
              }}
              fixed
            >
              {/* Description */}
              <Text style={styles.header1}>Items</Text>
              {/* qty */}
              <Text style={styles.header2}>Quantity</Text>
              {/* price */}
              <Text style={styles.header3}>Unit Price</Text>
              {/* amount */}
              <Text style={styles.header4}>Amount</Text>
            </View>
            {/* Rows Data */}
            {props.Data.map((data) => {
              return (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderTop: "0px solid black",
                  }}
                >
                  Description
                  <Text style={styles.cell1}>{data.itemName}</Text>
                  qty
                  <Text style={styles.cell2}>{data.itemQuantity}</Text>
                  price
                  <Text style={styles.cell3}>{data.itemPrice}</Text>
                  amount
                  <Text style={styles.cell4}>{data.totalAmount}</Text>
                </View>
              );
            })}
            {/* ************************************* */}
            {/* Bottom Line */}
            {/* ************************************* */}
            <View
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#032248",
                marginTop: "10px",
              }}
            ></View>
            {/* ********************************************* */}
            {/* Bill Account Info */}
            {/* ********************************************* */}
            {/* Main Wrapper */}
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
              </View>
              <View style={styles.accountGrandWrraper}>
                <View style={styles.accountInfoCard}>
                  <Text style={styles.accountInfoTitle}>Grand Total: </Text>
                  <Text style={styles.accountInfo}>{props.cGrand} /-</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
export default AddNewBillReport;
