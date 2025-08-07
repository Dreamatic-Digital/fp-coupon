import { useState } from "react";
import svgPaths from "../imports/svg-0pkzwy2ymd";

export function CouponRedemptionForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorType, setErrorType] = useState<"error" | "warning" | "domain-error" | null>(null);

  const claimCoupon = async (email: string) => {
    // For this example, we'll use placeholder values for firstName and lastName
    // In a real application, you might want to collect these from the user
    const firstName = email.split('@')[0]; // Use email prefix as firstName
    const lastName = "User"; // Placeholder lastName
    const consent = true;
    const apiKey = "SCM9DAW5E1P4edisif34WQaN9igBvTxbkx";
    const username = "fitness_passport";
    const password = "SCVfecURAt6UyTRliXPNfpImyxsKwnrslQ";
    const credentials = btoa(`${username}:${password}`);
    
    const response = await fetch("https://fp-coupon.lloyd-954.workers.dev/", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${credentials}`,
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        consent
      })
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw { status: response.status, message: result.error };
    }
    
    return result.coupon;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    setErrorType(null);
    setIsSubmitted(false);
    
    try {
      await claimCoupon(email);
      setIsSubmitted(true);
    } catch (err: any) {
      const status = err.status;
      
      if (status === 429) {
        setErrorType("warning");
      } else if (status === 403) {
        setErrorType("domain-error");
      } else if (status === 409) {
        setIsSubmitted(true);
      } else {
        setErrorType("error");
      }
    } finally {
      setIsLoading(false);
    }
  };