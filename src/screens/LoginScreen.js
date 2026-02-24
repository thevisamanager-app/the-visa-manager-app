import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
  StatusBar,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { useDispatch } from "react-redux";
import OTPVerify from "react-native-otp-verify";

import { saveUserToStorage } from "../Redux/authSlice";
import { sendOtp } from "../services/auth/otpLogin";
import { googleLogin } from "../services/auth/googleLogin";
import { wp, hp, scale, verticalScale, moderateScale, RFValue } from "../utils/metrics";
import ScreenWrapper from "../components/ScreenWrapper";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpFocusIndex, setOtpFocusIndex] = useState(0);
  const [confirmation, setConfirmation] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);
  const hiddenOtpRef = useRef(null);
  const isSubmittingOtpRef = useRef(false);

  const clearOtpListeners = () => {
    try {
      OTPVerify.removeListener();
    } catch (_e) {}
  };

  const completeLogin = async (user) => {
    if (!user) return;
    await dispatch(
      saveUserToStorage({
        isLoggedIn: true,
        uid: user?.uid || null,
        phone: user?.phoneNumber || null,
      })
    );
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      Alert.alert("Validation", "Enter valid 10-digit phone number");
      return;
    }

    try {
      setLoading(true);
      const result = await sendOtp(`+91${phone}`);
      setConfirmation(result);
    } catch (error) {
      Alert.alert("OTP Error", error?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const applyOtpCode = (code) => {
    const onlyDigits = String(code || "").replace(/\D/g, "").slice(0, 6);
    const next = ["", "", "", "", "", ""];
    onlyDigits.split("").forEach((d, i) => {
      next[i] = d;
    });
    setOtp(next);
    setOtpFocusIndex(Math.min(onlyDigits.length, 5));
  };

  const handleOtpChange = (value, index) => {
    const digits = String(value || "").replace(/\D/g, "");
    if (digits.length > 1) {
      applyOtpCode(digits);
      return;
    }
    if (!/^\d?$/.test(digits)) return;

    const next = [...otp];
    next[index] = digits;
    setOtp(next);

    if (digits && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpBackspace = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if (!confirmation || Platform.OS !== "android") return;

    const startOtpListener = async () => {
      try {
        await OTPVerify.getOtp();
        OTPVerify.addListener(async (message) => {
          const match = message?.match(/\b(\d{6})\b/);
          if (!match?.[1]) return;

          applyOtpCode(match[1]);
          OTPVerify.removeListener();

          if (isSubmittingOtpRef.current || !confirmation) return;
          try {
            isSubmittingOtpRef.current = true;
            const result = await confirmation.confirm(match[1]);
            await completeLogin(result?.user);
          } catch (_e) {
            isSubmittingOtpRef.current = false;
          }
        });
      } catch (_e) {}
    };

    startOtpListener();
    return clearOtpListeners;
  }, [confirmation]);

  useEffect(() => {
    if (!confirmation) return;
    const timer = setTimeout(() => hiddenOtpRef.current?.focus(), 300);
    return () => clearTimeout(timer);
  }, [confirmation]);

  useEffect(() => {
    if (!confirmation) return;
    const unsub = auth().onAuthStateChanged(async (user) => {
      if (user) await completeLogin(user);
    });
    return () => {
      unsub?.();
      clearOtpListeners();
    };
  }, [confirmation]);

  const handleVerifyOtp = async () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      Alert.alert("Invalid OTP", "Enter 6-digit OTP");
      return;
    }

    try {
      if (isSubmittingOtpRef.current) return;
      isSubmittingOtpRef.current = true;
      const result = await confirmation.confirm(finalOtp);
      await completeLogin(result?.user);
    } catch (_e) {
      isSubmittingOtpRef.current = false;
      Alert.alert("Invalid OTP");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      Alert.alert("Google Login Failed", error?.message || "Google login failed");
    }
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.heroBlock}>
          <Text style={styles.kicker}>YOUR TRAVEL WORKSPACE</Text>
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.subText}>
            Sign in to manage visa applications,{"\n"}
            documents, and payments in one place.
          </Text>
        </View>

        {!confirmation ? (
          <>
            <TouchableOpacity
              style={styles.phoneCard}
              onPress={() => {
                if (!showPhoneInput) {
                  setShowPhoneInput(true);
                }
              }}
              disabled={loading}
            >
              <View style={styles.iconBubble}>
                <Text style={styles.iconBubbleText}>OTP</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.phoneCardTitle}>
                  {loading ? "Sending OTP..." : "Sign in with Phone / OTP"}
                </Text>
                <Text style={styles.phoneCardSub}>Get a secure code on your phone</Text>
              </View>
            </TouchableOpacity>

            {showPhoneInput ? (
              <View style={styles.phoneInputCard}>
                <Text style={styles.phoneInputLabel}>Phone number</Text>
                <View style={styles.phoneInputRow}>
                  <TextInput
                    style={styles.phoneInlineInput}
                    placeholder="e.g. +91 98765 43210"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="number-pad"
                    value={phone}
                    onChangeText={(val) => setPhone(val.replace(/\D/g, ""))}
                    maxLength={10}
                  />

                  <TouchableOpacity
                    style={styles.sendOtpBtn}
                    onPress={handleSendOtp}
                    disabled={loading}
                  >
                    <Text style={styles.sendOtpText}>
                      {loading ? "Sending..." : "Send OTP"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </>
        ) : (
          <>
            <Text style={styles.otpTitle}>Enter OTP</Text>

            <View style={styles.otpRow}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputsRef.current[index] = ref;
                  }}
                  style={[
                    styles.otpBox,
                    otpFocusIndex === index ? styles.otpBoxActive : null,
                    digit ? styles.otpFilled : null,
                  ]}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onFocus={() => setOtpFocusIndex(index)}
                  onChangeText={(val) => {
                    handleOtpChange(val, index);
                    if (val) {
                      setOtpFocusIndex(Math.min(index + 1, 5));
                    }
                  }}
                  onKeyPress={(e) => {
                    handleOtpBackspace(e, index);
                    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
                      setOtpFocusIndex(index - 1);
                    }
                  }}
                  textContentType={index === 0 ? "oneTimeCode" : "none"}
                  autoComplete={index === 0 ? "sms-otp" : "off"}
                  autoFocus={index === 0}
                />
              ))}
            </View>

            <TextInput
              ref={hiddenOtpRef}
              value={otp.join("")}
              onChangeText={applyOtpCode}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete="sms-otp"
              importantForAutofill="yes"
              style={styles.hiddenOtpInput}
              caretHidden
            />

            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                clearOtpListeners();
                setConfirmation(null);
                setOtp(["", "", "", "", "", ""]);
                setOtpFocusIndex(0);
                setShowPhoneInput(true);
              }}
            >
              <Text style={styles.changeText}>Change phone number</Text>
            </TouchableOpacity>
          </>
        )}

        {!confirmation ? (
          <TouchableOpacity style={styles.googleCard} onPress={handleGoogleLogin}>
            <View style={styles.googleIconWrap}>
              <Text style={styles.googleIconText}>G</Text>
            </View>
            <Text style={styles.googleText}>Sign in with Google</Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.tajImageWrap}>
          <Image
            source={require("../assets/images/tajmahallogin.webp")}
            style={styles.tajImage}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.termsText}>
          By continuing you agree to our{" "}
          <Text
            style={styles.linkText}
            onPress={() => Linking.openURL("https://www.thevisamanager.com/privacy-policy")}
          >
            terms of use and privacy policy
          </Text>
          .
        </Text>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scroll: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: wp("5%"),
    paddingBottom: hp("3%"),
    paddingTop: hp("7%"),
    justifyContent: "space-between",
  },
  heroBlock: {
    marginTop: hp("2%"),
    alignItems: "center",
  },
  kicker: {
    color: "#F97316",
    letterSpacing: 2.4,
    fontSize: RFValue(11),
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  welcome: {
    color: "#1D8BE6",
    fontSize: RFValue(38),
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subText: {
    color: "#374151",
    fontSize: RFValue(14),
    lineHeight: verticalScale(22),
    marginBottom: verticalScale(18),
    textAlign: "center",
  },
  phoneCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1D8BE6",
    borderRadius: moderateScale(16),
    paddingHorizontal: moderateScale(14),
    paddingVertical: verticalScale(14),
    marginBottom: verticalScale(14),
    shadowColor: "#1D8BE6",
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  iconBubble: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(18),
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(10),
  },
  iconBubbleText: {
    color: "#fff",
    fontSize: RFValue(11),
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  phoneCardTitle: {
    color: "#fff",
    fontWeight: "700",
    fontSize: RFValue(14),
  },
  phoneCardSub: {
    color: "#E5F1FF",
    fontSize: RFValue(12),
  },
  phoneInputCard: {
    borderWidth: 1,
    borderColor: "#FFD6AE",
    borderStyle: "dashed",
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    marginBottom: verticalScale(12),
    backgroundColor: "#FFFDFB",
  },
  phoneInputLabel: {
    color: "#F97316",
    fontSize: RFValue(13),
    fontWeight: "700",
    marginBottom: verticalScale(8),
  },
  phoneInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(8),
  },
  phoneInlineInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: scale(1),
    borderColor: "#F4B37A",
    paddingVertical: verticalScale(10),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(12),
    color: "#111827",
    fontSize: RFValue(15),
  },
  sendOtpBtn: {
    backgroundColor: "#1D8BE6",
    borderRadius: moderateScale(12),
    paddingVertical: verticalScale(11),
    paddingHorizontal: moderateScale(14),
    minWidth: wp("26%"),
    alignItems: "center",
    justifyContent: "center",
  },
  sendOtpText: {
    color: "#fff",
    fontSize: RFValue(15),
    fontWeight: "700",
  },
  otpTitle: {
    color: "#111827",
    fontSize: RFValue(18),
    textAlign: "center",
    marginBottom: verticalScale(12),
    fontWeight: "600",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(24),
  },
  otpBox: {
    width: moderateScale(42),
    height: moderateScale(42),
    backgroundColor: "#F3F4F6",
    borderRadius: moderateScale(6),
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: RFValue(18),
    fontWeight: "700",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#1F2937",
  },
  otpFilled: {
    borderColor: "#D1D5DB",
  },
  otpBoxActive: {
    borderColor: "#F4B37A",
    backgroundColor: "#FFFFFF",
  },
  button: {
    backgroundColor: "#1D8BE6",
    paddingVertical: verticalScale(14),
    borderRadius: moderateScale(12),
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: RFValue(16),
    fontWeight: "600",
  },
  changeText: {
    color: "#1D4ED8",
    textAlign: "center",
    marginTop: verticalScale(12),
    textDecorationLine: "underline",
  },
  googleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingVertical: verticalScale(14),
    paddingHorizontal: moderateScale(14),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(14),
  },
  googleIconWrap: {
    width: moderateScale(36),
    height: moderateScale(36),
    borderRadius: moderateScale(10),
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: moderateScale(12),
  },
  googleIconText: {
    color: "#EA4335",
    fontWeight: "700",
    fontSize: RFValue(18),
  },
  googleText: {
    color: "#111827",
    fontSize: RFValue(16),
    fontWeight: "700",
  },
  tajImageWrap: {
    alignSelf: "stretch",
    height: hp("20%"),
    marginTop: verticalScale(10),
    marginHorizontal: -wp("5%"),
    justifyContent: "center",
  },
  tajImage: {
    width: "100%",
    height: "100%",
  },
  termsText: {
    marginTop: verticalScale(6),
    textAlign: "center",
    fontSize: RFValue(12),
    color: "#6B7280",
  },
  linkText: {
    color: "#FF5C00",
    textDecorationLine: "underline",
    fontWeight: "600",
  },
  hiddenOtpInput: {
    position: "absolute",
    opacity: 0,
    width: 1,
    height: 1,
  },
});
