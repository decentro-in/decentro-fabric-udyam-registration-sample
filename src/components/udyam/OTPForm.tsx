import { useEffect, useState } from "react";
import { PinInput, Button, Stack, Text, Input } from "@mantine/core";

type OTPFormProps = {
  onSubmit: (otp: string) => void;
  errorText?: string;
};

const OTPForm = ({ onSubmit, errorText }: OTPFormProps) => {
  const [otp, setOtp] = useState<string>("");
  const [errorString, setErrorString] = useState<string | undefined>(errorText);

  useEffect(() => {setErrorString(errorText);}, [errorText]);

  const [loading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setErrorString(undefined);
    setIsLoading(true)
    onSubmit(otp);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="flex flex-col items-center justify-center content-center  space-y-6">
        <Input.Wrapper
          label="OTP"
          description="Enter the otp sent to your registered mobile"
          error={errorString}
          className="w-full"
        >
          <PinInput
            oneTimeCode
            name="OTP"
            inputMode="numeric"
            type="number"
            length={6}
            error={errorString != undefined}
            onChange={(otp) => setOtp(otp)}
            value={otp}
            gap="lg"
          />
        </Input.Wrapper>

        <Button loading={loading} disabled={otp.length != 6} onClick={handleSubmit} fullWidth>
          Submit OTP
        </Button>
      </div>
    </div>
  );
};

export default OTPForm;
