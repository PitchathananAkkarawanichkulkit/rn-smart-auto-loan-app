import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ResultScreen() {
  const router = useRouter();
  
  // 1. รับค่าที่ส่งมาจากหน้า input
  const { carPrice, downPayment, months, interestRate } = useLocalSearchParams();

  // 2. แปลงค่าที่รับมาให้เป็นตัวเลขสำหรับการคำนวณ
  const price = parseFloat(carPrice as string) || 0;
  const downPercent = parseFloat(downPayment as string) || 0;
  const monthsCount = parseInt(months as string) || 0;
  const interest = parseFloat(interestRate as string) || 0;

  // 3. สูตรคำนวณค่างวดรถ (Flat Rate)
  const downAmount = price * (downPercent / 100); // จำนวนเงินดาวน์
  const financeAmount = price - downAmount; // ยอดจัดไฟแนนซ์
  const totalInterest = financeAmount * (interest / 100) * (monthsCount / 12); // ดอกเบี้ยรวมทั้งหมด
  const totalToPay = financeAmount + totalInterest; // ยอดรวมที่ต้องจ่าย (จัดไฟแนนซ์ + ดอกเบี้ย)
  const monthlyPayment = totalToPay / monthsCount; // ยอดผ่อนต่อเดือน

  // ฟังก์ชันจัดรูปแบบตัวเลขให้มีลูกน้ำและทศนิยม 2 ตำแหน่ง
  const formatNumber = (num: number) => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        {/* ไอคอนกุญแจรถ (เปลี่ยนชื่อไฟล์รูปให้ตรงกับของคุณ) */}
        <Image
          source={require("../assets/images/loan.png")} 
          style={styles.icon}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>สรุปยอดผ่อนชำระ</Text>

        {/* การ์ดสีน้ำเงิน (ยอดผ่อนต่อเดือน) */}
        <View style={styles.blueCard}>
          <Text style={styles.blueCardText}>ผ่อนเริ่มต้นเพียง</Text>
          <Text style={styles.monthlyPayment}>{formatNumber(monthlyPayment)}</Text>
          <Text style={styles.blueCardText}>
            บาท / เดือน ({monthsCount} งวด)
          </Text>
        </View>

        {/* การ์ดสีขาว (รายละเอียด) */}
        <View style={styles.whiteCard}>
          
          <View style={styles.row}>
            <Text style={styles.rowLabel}>ราคารถยนต์</Text>
            <Text style={styles.rowValue}>{formatNumber(price)} บาท</Text>
          </View>
          
          <View style={styles.row}>
            <Text style={styles.rowLabel}>เงินดาวน์ ({downPercent}%)</Text>
            <Text style={[styles.rowValue, { color: "#2F6BFF" }]}>
              {formatNumber(downAmount)} บาท
            </Text>
          </View>
          
          <View style={styles.row}>
            <Text style={[styles.rowLabel, { fontFamily: "Kanit_700Bold" }]}>
              ยอดจัดไฟแนนซ์
            </Text>
            <Text style={[styles.rowValue, { fontFamily: "Kanit_700Bold" }]}>
              {formatNumber(financeAmount)} บาท
            </Text>
          </View>

          {/* เส้นคั่น */}
          <View style={styles.divider} />

          <Text style={styles.note}>
            * เป็นการคำนวณเบื้องต้น ยังไม่รวม Vat 7% และค่าใช้จ่ายอื่นๆ
          </Text>
        </View>

        {/* ปุ่มคำนวณใหม่ (กดย้อนกลับไปหน้าเดิม) */}
        <TouchableOpacity style={styles.recalcBtn} onPress={() => router.back()}>
          <Text style={styles.recalcBtnText}>คำนวณใหม่</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1C2434", // สีพื้นหลังกรมท่าเข้ม
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 40,
    alignItems: "center",
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Kanit_700Bold",
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 25,
  },
  blueCard: {
    backgroundColor: "#2F6BFF",
    width: "100%",
    borderRadius: 20,
    paddingVertical: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  blueCardText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#E2E8F0",
    marginBottom: 5,
  },
  monthlyPayment: {
    fontFamily: "Kanit_700Bold",
    fontSize: 38,
    color: "#FFFFFF",
    marginBottom: 5,
  },
  whiteCard: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  rowLabel: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#64748B",
  },
  rowValue: {
    fontFamily: "Kanit_700Bold",
    fontSize: 16,
    color: "#1E293B",
  },
  divider: {
    height: 1,
    backgroundColor: "#E2E8F0",
    marginVertical: 15,
  },
  note: {
    fontFamily: "Kanit_400Regular",
    fontSize: 11,
    color: "#94A3B8",
    textAlign: "center",
    lineHeight: 18,
  },
  recalcBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },
  recalcBtnText: {
    fontFamily: "Kanit_700Bold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});