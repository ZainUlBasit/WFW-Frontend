import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import update_WFW_image from "../../../assets/images/update_WFW_image.png";
import { yellow } from "@mui/material/colors";

const CustomPDF = () => {
  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Doe", age: 25 },
    { id: 3, name: "Bob Smith", age: 40 },
  ];

  return (
    <Document>
      <Page>
        <View style={styles.main}>
          {/* <Text style={styles.title}>My Custom PDF Document</Text> */}
          {/* Header */}
          <View style={styles.header}>
            <Image src={update_WFW_image} style={styles.img}></Image>
            <View style={styles.headerRight}>
              <View style={styles.headerInnerTitle}>
                <Text style={styles.headerInnerInvoice}>Invoice</Text>
              </View>
              <View style={styles.headerInnerCompany}>
                <Text>Irshad Carton Dealer</Text>
                <Text>Swat, KPK, Pakistan</Text>
              </View>
            </View>
          </View>
          {/* Body */}
          <View style={styles.body}>
            <View style={styles.table}>
              {/* Table header */}
              <View style={styles.tblHead}>
                <Text style={styles.tableColHeader}>ID</Text>
                <Text style={styles.tableColHeader}>Name</Text>
                <Text style={styles.tableColHeader}>Age</Text>
              </View>
              {/* Table body */}
              {data.map((item) => (
                <View key={item.id} style={styles.tableRow}>
                  <Text style={styles.tableCol}>{item.id}</Text>
                  <Text style={styles.tableCol}>{item.name}</Text>
                  <Text style={styles.tableCol}>{item.age}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* Footer */}
          <View style={styles.footer}>
            <Text>Footer</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default CustomPDF;

const styles = StyleSheet.create({
  img: {
    height: "90",
    width: "120",
  },
  headerInner: {
    flexGrow: 1,
  },
  headerInnerTitle: {
    backgroundColor: "black",
    color: "white",
    marginVertical: 10,
    paddingLeft: 10,
  },
  headerInnerCompany: {
    flexGrow: 1,
    backgroundColor: "yellow"
  },
  headerInnerInvoice: {},
  header: {
    width: "100%",
    height: "10%",
    justifyContent: "space-between",
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
    paddingLeft: "10px",
    paddingRight: "10px",
    marginVertical: "20px",
  },
  body: {
    height: "80%",
  },
  footer: {
    height: "10%",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 50,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  text: {
    fontSize: 12,
    margin: 10,
    textAlign: "justify",
  },
  table: {
    display: "table",
    width: "auto",
    margin: "0px 10px",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    fontWeight: "bold",
    width: "33.33%",
    border: "1px solid black",
  },
  tableCol: {
    width: "33.33%",
  },
  tblHead: {
    backgroundColor: "#5a4ae3",
    color: "white",
    display: "flex !important",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
