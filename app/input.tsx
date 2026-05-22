import { router } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";

export default function InputScreen() {
  // State สำหรับเก็บข้อมูลแบบฟอร์ม
  const [carPrice, setCarPrice] = useState("");
  const [downPayment, setDownPayment] = useState<number>(15); // ค่าเริ่มต้น 15%
  const [months, setMonths] = useState<number>(48); // ค่าเริ่มต้น 48 งวด
  const [interestRate, setInterestRate] = useState("");

  // ตัวเลือกสำหรับปุ่มกด
  const downPaymentOptions = [5, 10, 15, 20, 25, 30];
  const monthsOptions = [24, 36, 48, 60, 72, 84];

  // ฟังก์ชันเมื่อกดปุ่มคำนวณ
  const handleCalculate = () => {
    if (!carPrice || !interestRate) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกราคารถและดอกเบี้ยให้ครบถ้วน");
      return;
    }
    // ตัวอย่างการแสดงผลลัพธ์ (สามารถเปลี่ยนไปใช้ router.push เพื่อส่งข้อมูลไปหน้าอื่นได้)
    router.push({
      pathname: "/result",
      params: { carPrice, downPayment, months, interestRate },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        {/* ส่วนหัว: รูปภาพรถ (อย่าลืมเปลี่ยน Path รูปให้ตรงกับในโปรเจกต์ของคุณ) */}
        <View style={styles.headerImageContainer}>
          <Image
            source={require("../assets/images/loan.png")} // เปลี่ยนเป็นชื่อไฟล์รูปรถของคุณ
            style={styles.headerImage}
            resizeMode="cover"
          />
        </View>

        {/* ส่วนฟอร์มข้อมูล (พื้นหลังสีขาว ขอบมนด้านบน) */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>คำนวณค่างวดรถ</Text>

          {/* 1. ราคารถ */}
          <Text style={styles.label}>ราคารถ (บาท)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="เช่น 850000"
            placeholderTextColor="#A0AEC0"
            keyboardType="numeric"
            value={carPrice}
            onChangeText={setCarPrice}
          />

          {/* 2. เลือกเงินดาวน์ (%) */}
          <Text style={styles.label}>เลือกเงินดาวน์ (%)</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {downPaymentOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chipBtn,
                  downPayment === item && styles.chipBtnActive,
                ]}
                onPress={() => setDownPayment(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    downPayment === item && styles.chipTextActive,
                  ]}
                >
                  {item}%
                </Text>
              </TouchableOpacity>
            ))}
            {/* กล่องเปล่าเผื่อเว้นระยะขอบขวาเวลาม้วนสุด */}
            <View style={{ width: 20 }} />
          </ScrollView>

          {/* 3. ระยะเวลาผ่อน (งวด) */}
          <Text style={styles.label}>ระยะเวลาผ่อน (งวด)</Text>
          <View style={styles.gridContainer}>
            {monthsOptions.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.chipBtn,
                  styles.chipGridItem,
                  months === item && styles.chipBtnActive,
                ]}
                onPress={() => setMonths(item)}
              >
                <Text
                  style={[
                    styles.chipText,
                    months === item && styles.chipTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 4. ดอกเบี้ย */}
          <Text style={styles.label}>ดอกเบี้ย (% ต่อปี)</Text>
          <TextInput
            style={styles.textInput}
            placeholder="เช่น 2.59"
            placeholderTextColor="#A0AEC0"
            keyboardType="numeric"
            value={interestRate}
            onChangeText={setInterestRate}
          />

          {/* ปุ่มคำนวณค่างวด */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleCalculate}>
            <Text style={styles.submitBtnText}>คำนวณค่างวด</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A7E4F2", // สีพื้นหลังท้องฟ้าด้านบน (ปรับให้เข้ากับรูปรถ)
  },
  headerImageContainer: {
    width: "100%",
    height: 220,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
    marginTop: -30, // ดึงให้ขอบมนขาวๆ ซ้อนทับรูปรถด้านบน
  },
  title: {
    fontFamily: "Kanit_700Bold",
    fontSize: 22,
    color: "#2D3748",
    marginBottom: 25,
  },
  label: {
    fontFamily: "Kanit_700Bold",
    fontSize: 14,
    color: "#4A5568",
    marginBottom: 10,
    marginTop: 15,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    fontFamily: "Kanit_400Regular",
    color: "#2D3748",
    backgroundColor: "#F8FAFC",
  },
  horizontalScroll: {
    flexDirection: "row",
    marginBottom: 5,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10, // ระยะห่างระหว่างปุ่มใน Grid (ใช้ได้ใน React Native เวอร์ชั่นใหม่)
  },
  chipBtn: {
    backgroundColor: "#F1F5F9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
    minWidth: 60,
    alignItems: "center",
  },
  chipGridItem: {
    marginRight: 0, // Reset margin เพราะใช้ gap ใน gridContainer แทน
    width: "21%", // แบ่งหน้าจอให้ได้ประมาณแถวละ 4 ปุ่ม
  },
  chipBtnActive: {
    backgroundColor: "#1E293B", // สีน้ำเงินเข้มตอนถูกเลือก
  },
  chipText: {
    fontFamily: "Kanit_400Regular",
    fontSize: 14,
    color: "#64748B",
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontFamily: "Kanit_700Bold",
  },
  submitBtn: {
    backgroundColor: "#2F6BFF", // สีน้ำเงินสว่าง
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 35,
    shadowColor: "#2F6BFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // สำหรับ Android
  },
  submitBtnText: {
    fontFamily: "Kanit_700Bold",
    color: "#FFFFFF",
    fontSize: 16,
  },
});
