import React, { useState, useEffect } from 'react'
import { Card, Input, Form, Button,InputNumber } from 'antd';
import { Contact } from '../../../interfaces';

const { Meta } = Card;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

type FormContactProps = {
    contact?: Contact,
    resultEmitter: any
}

const initialValues = {
    nom: "",
    prenom: "",
    email: "",
    numero: ""
}

const FormContact = ({ contact, resultEmitter }: FormContactProps) => {

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue(contact)
    },[contact])

    const onFinish = (values: any) => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            if(contact) {
                resultEmitter({...values,id : contact.id});
            }else {
                resultEmitter(values);
            }
            form.resetFields();
        }, 300)
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            style={{ maxWidth: 600, paddingTop: 30 }}
            scrollToFirstError
        >
            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="prenom"
                label="prenom"
                rules={[{ required: true, message: 'Veuillez entrer votre prenom!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="nom"
                label="nom"
                rules={[{ required: true, message: 'Veuillez entrer votre nom!', whitespace: true }]}
            >
                <Input />
            </Form.Item>


            <Form.Item
                name="numero"
                label="Telephone"
                tooltip="Numero de 9 chiffres"
                rules={[{ required: true, message: 'Veuiller entre votre numero!' }]}
                style={{ paddingBottom: 30 }}
            >
                <InputNumber addonBefore={[+221]} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button loading={loading} type="primary" htmlType="submit">
                    { contact ? "Modifier" : "Ajouter"}
                </Button>
            </Form.Item>
        </Form>
    );

}

export default FormContact;
