import { useState } from "react";
import svgPaths from "../imports/svg-0pkzwy2ymd";

export function CouponRedemptionForm() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="relative size-full" data-name="Wrapper">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-start p-[32px] relative size-full">
          <div
            className="basis-0 bg-[#ffffff] grow h-full min-h-px min-w-px relative rounded-[25px] shadow-[0px_0px_8px_0px_rgba(79,115,158,0.1)] shrink-0"
            data-name="Inner"
          >
            <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
              <div className="box-border content-stretch flex flex-col gap-4 items-center justify-center px-[120px] py-4 relative size-full">
                <div
                  className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#000000] text-[14px] text-center w-[226px]"
                  style={{ fontVariationSettings: "'wdth' 100" }}
                >
                  <p className="block leading-[normal]">
                    Enter your work email to receive your coupon code.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="relative shrink-0 w-full" data-name="Form Fields">
                  <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
                    <div className="box-border content-stretch flex flex-col gap-2.5 items-center justify-center p-[10px] relative w-full">
                      <div
                        className="h-[39px] relative rounded-[10px] shrink-0 w-full"
                        data-name="Field - Email"
                      >
                        <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="box-border content-stretch flex flex-row gap-[230px] h-[39px] items-center justify-between px-[23px] py-3 relative w-full bg-transparent border border-[#d0d7e3] border-solid rounded-[10px] font-['Roboto:Regular',_sans-serif] font-normal text-[#6d6d6d] text-[12px] focus:outline-none focus:border-[#0693e3]"
                            style={{ fontVariationSettings: "'wdth' 100" }}
                          />
                          <div
                            className="absolute right-[23px] h-3 w-[17px] pointer-events-none"
                            data-name="Vector"
                          >
                            <svg
                              className="block size-full"
                              fill="none"
                              preserveAspectRatio="none"
                              viewBox="0 0 17 12"
                            >
                              <path
                                d={svgPaths.p33ee000}
                                fill="var(--fill-0, #0693E3)"
                                id="Vector"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      {/* Submit Button with fade-out animation */}
                      <button
                        type="submit"
                        disabled={isLoading || !email}
                        className={`bg-gradient-to-r from-[#0693e3] relative rounded-[10px] shrink-0 to-[#33a7b5] w-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-500 ease-out ${
                          isSubmitted ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
                        }`}
                        data-name="Submit"
                      >
                        <div className="flex flex-row items-center justify-center overflow-clip relative size-full">
                          <div className="box-border content-stretch flex flex-row gap-[200px] items-center justify-center px-[23px] py-3 relative w-full">
                            <div
                              className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#ffffff] text-[12px] text-left text-nowrap"
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              <p className="block leading-[normal] whitespace-pre">
                                {isLoading ? "Processing..." : "Redeem Code"}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className="absolute border border-[#d0d7e3] border-solid inset-0 pointer-events-none rounded-[10px]"
                        />
                      </button>
                      
                      {/* Error Notification - Hidden */}
                      <div
                        className="bg-[rgba(235,95,39,0.15)] relative rounded-[10px] shrink-0 w-full hidden"
                        data-name="Notification - Error"
                      >
                        <div className="flex flex-row items-center overflow-clip relative size-full">
                          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-[8px] relative w-full">
                            <div
                              className="h-6 relative shrink-0 w-[27px]"
                              data-name="Icon-Warning"
                            >
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 27 24"
                              >
                                <path
                                  d={svgPaths.p3147a500}
                                  fill="var(--fill-0, #EB5F27)"
                                  id="Icon-Warning"
                                />
                              </svg>
                            </div>
                            <div
                              className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#4a4a4a] text-[12px] text-left"
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              <p className="block leading-[normal]">
                                We're experiencing issues. Please contact your
                                programme administrator for support.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className="absolute border border-[rgba(235,95,39,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]"
                        />
                      </div>
                      
                      {/* Warning Notification - Hidden */}
                      <div
                        className="bg-[rgba(238,163,0,0.15)] relative rounded-[10px] shrink-0 w-full hidden"
                        data-name="Notification - Warning"
                      >
                        <div className="flex flex-row items-center overflow-clip relative size-full">
                          <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-[8px] relative w-full">
                            <div
                              className="h-6 relative shrink-0 w-[27px]"
                              data-name="Icon-Warning"
                            >
                              <svg
                                className="block size-full"
                                fill="none"
                                preserveAspectRatio="none"
                                viewBox="0 0 27 24"
                              >
                                <path
                                  d={svgPaths.p3147a500}
                                  fill="var(--fill-0, #EEA300)"
                                  id="Icon-Warning"
                                />
                              </svg>
                            </div>
                            <div
                              className="basis-0 flex flex-col font-['Roboto:Medium',_sans-serif] font-medium grow justify-center leading-[0] min-h-px min-w-px relative shrink-0 text-[#4a4a4a] text-[12px] text-left"
                              style={{ fontVariationSettings: "'wdth' 100" }}
                            >
                              <p className="block leading-[normal]">
                                Something went wrong. Please try again in a few
                                minutes.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className="absolute border border-[rgba(238,163,0,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]"
                        />
                      </div>
                      
                      {/* Success Notification - Slides up into button's place */}
                      {isSubmitted && (
                        <div
                          className={`bg-[rgba(74,186,99,0.15)] relative rounded-[10px] shrink-0 w-full transition-all duration-500 ease-out ${
                            isSubmitted ? 'opacity-100 -translate-y-[calc(100%+0.625rem)] animate-in slide-in-from-bottom-4' : 'opacity-0 translate-y-0'
                          }`}
                          data-name="Notification - Success"
                        >
                          <div className="flex flex-row items-center overflow-clip relative size-full">
                            <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-[8px] relative w-full">
                              <div
                                className="relative shrink-0 size-6"
                                data-name="Icon-Success"
                              >
                                <svg
                                  className="block size-full"
                                  fill="none"
                                  preserveAspectRatio="none"
                                  viewBox="0 0 24 24"
                                >
                                  <g id="Icon-Success">
                                    <path
                                      d={svgPaths.p2c50c000}
                                      fill="var(--fill-0, #4ABA63)"
                                      id="Vector"
                                    />
                                    <path
                                      d={svgPaths.p136ff000}
                                      fill="var(--fill-0, #4ABA63)"
                                      id="Vector_2"
                                    />
                                  </g>
                                </svg>
                              </div>
                              <div
                                className="flex flex-col font-['Roboto:Medium',_sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#4a4a4a] text-[12px] text-left text-nowrap"
                                style={{ fontVariationSettings: "'wdth' 100" }}
                              >
                                <p className="block leading-[normal] whitespace-pre">
                                  Success! Your coupon code is on its way
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            aria-hidden="true"
                            className="absolute border border-[rgba(74,186,99,0.5)] border-solid inset-0 pointer-events-none rounded-[10px]"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}