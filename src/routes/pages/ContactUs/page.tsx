import { PT12Wrapper } from "@/components/Wrappers";
import { Form, Input, Button, Radio, RadioGroup } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";

// form
// {
//     firstName: "",
//     lastName: "",
//     email: "",
//     companyName: "",
//     telegramHandle: "",
//     whatcanwehelpyouwith: "",
//     topic: "", // other, cysic network, asic soultions, gpu acceleration
// }

const radioClassName = "mr-2 !normal-case text-sub teachers-16-400 border hover:border-default-400 border-default-200 border-[2px] rounded-lg py-2 px-4"
const FormInputWithLabel = ({
    placeholder,
    label,
    className,
    validate,
    ...props
}: {
    placeholder: string;
    label: string;
    className?: string;
    validate?: (value: string) => string | null;
    [key: string]: any;
}) => {
    return (
        <Input
            validate={validate}
            placeholder={placeholder}
            labelPlacement="outside"
            variant="bordered"
            label={
                <span className="teachers-16-400 text-sub !normal-case">{label}</span>
            }
            isRequired
            className={className}
            classNames={{
                inputWrapper: "min-h-fit rounded-lg py-4",
                label: "h-[30px]",
            }}
            {...props}
        />
    );
};


const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        companyName: "",
        telegramHandle: "",
        whatcanwehelpyouwith: "",
        topic: "",
    });

    const onSubmit = (e: React.FormEvent) => {
        setIsLoading(true);
        e.preventDefault();

        // 按照URL编码格式构造表单数据
        const formParams = new URLSearchParams();
        formParams.append('First-Name', formData.firstName);
        formParams.append('Last-Name', formData.lastName);
        formParams.append('Email', formData.email);
        formParams.append('Company-Name', formData.companyName);
        formParams.append('Telegram-Handle', formData.telegramHandle);
        formParams.append('field', formData.whatcanwehelpyouwith);
        formParams.append('Topic', formData.topic);

        // 提交到相同的endpoint，使用与线上相同的格式
        fetch('https://submit-form.com/tChnyWtrR', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formParams.toString(),
        })
            .then(response => {
                if (response.ok) {
                    toast.success("Submit Form Success");
                } else {
                    toast.error("Submit Form Failed");
                }
            })
            .catch(error => {
                console.error("Submit Form Error", error);
                toast.error("Submit Form Failed");
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    return (
        <PT12Wrapper className="w-full flex-1 flex flex-col">
            <>
                <h1 className="unbounded-36-180-200 text-center pb-12">
                    Contact
                    <br />
                    Us
                </h1>
                <div className="p-2 pb-12 lg:p-12 bg-black flex-1 flex flex-col">
                    <div className="pt-6 px-4 lg:px-12 flex flex-col lg:flex-row gap-4 main-container">
                        <p className="flex-1 teachers-24-400 tracking-widest leading-[1.3]">
                            Please fill in this form, we will get back to you as soon as we
                            can.
                        </p>

                        <div className="flex-[2]">
                            <Form onSubmit={onSubmit} className="flex flex-col gap-6">
                                <div className="w-full flex items-center gap-4">
                                    <FormInputWithLabel
                                        validate={(value) => {
                                            return null;
                                        }}
                                        className="flex-1"
                                        placeholder="ENTER FIRST NAME HERE"
                                        label="First Name"
                                        value={formData.firstName}
                                        onChange={(e) => {
                                            setFormData({ ...formData, firstName: e.target.value });
                                        }}
                                    />
                                    <FormInputWithLabel
                                        validate={(value) => {
                                            return null;
                                        }}
                                        className="flex-1"
                                        placeholder="ENTER LAST NAME HERE"
                                        label="Last Name"
                                        value={formData.lastName}
                                        onChange={(e) => {
                                            setFormData({ ...formData, lastName: e.target.value });
                                        }}
                                    />
                                </div>
                                <FormInputWithLabel
                                    validate={(value) => {
                                        return null;
                                    }}
                                    placeholder="ENTER EMAIL HERE"
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        setFormData({ ...formData, email: e.target.value });
                                    }}
                                />
                                <FormInputWithLabel
                                    validate={(value) => {
                                        return null;
                                    }}
                                    placeholder="ENTER COMPANY NAME HERE"
                                    label="Company Name"
                                    value={formData.companyName}
                                    onChange={(e) => {
                                        setFormData({ ...formData, companyName: e.target.value });
                                    }}
                                />
                                <FormInputWithLabel
                                    validate={(value) => {
                                        return null;
                                    }}
                                    placeholder="ENTER TELEGRAM HANDLE HERE"
                                    label="Telegram Handle"
                                    value={formData.telegramHandle}
                                    onChange={(e) => {
                                        setFormData({ ...formData, telegramHandle: e.target.value });
                                    }}
                                />
                                <FormInputWithLabel
                                    validate={(value) => {
                                        return null;
                                    }}
                                    placeholder="ENTER YOUR MESSAGE HERE"
                                    label="What can we help you with?"
                                    value={formData.whatcanwehelpyouwith}
                                    onChange={(e) => {
                                        setFormData({ ...formData, whatcanwehelpyouwith: e.target.value });
                                    }}
                                />


                                <div className="w-full">
                                    <RadioGroup
                                        classNames={{
                                            label: "h-[30px]",
                                            wrapper: "ml-2"
                                        }}
                                        value={formData.topic}
                                        onValueChange={(value) => {
                                            setFormData({ ...formData, topic: value });
                                        }}
                                        isRequired
                                        label={
                                            <span className="teachers-16-400 text-sub !normal-case">Topic</span>
                                        } orientation="horizontal" size="sm" >
                                        <Radio className={radioClassName} value="other">Other</Radio>
                                        <Radio className={radioClassName} value="cysic-network">Cysic Network</Radio>
                                        <Radio className={radioClassName} value="asic-solutions">Asic Solutions</Radio>
                                        <Radio className={radioClassName} value="gpu-acceleration">Gpu Acceleration</Radio>
                                    </RadioGroup>
                                </div>

                                <Button
                                    isLoading={isLoading}
                                    isDisabled={
                                        !formData.firstName ||
                                        !formData.lastName ||
                                        !formData.email ||
                                        !formData.companyName ||
                                        !formData.telegramHandle ||
                                        !formData.whatcanwehelpyouwith ||
                                        !formData.topic
                                    }
                                    type="submit"
                                    className="min-h-fit w-full py-6 teachers-16-400 bg-white text-black rounded-lg"
                                >
                                    Accelerate
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </>
        </PT12Wrapper>
    );
};

export default ContactUs;
