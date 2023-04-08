import React, { useReducer, useState } from 'react'
import { reducer, initialState, init } from '../../../reducers/contactReducer'
import { Avatar,Card, List, Modal, Button, Popconfirm, Drawer,Descriptions } from 'antd';
import { PlusOutlined,EditOutlined,DeleteOutlined,IdcardOutlined } from '@ant-design/icons';
import { ADD, DELETE,UPDATE } from '../../../reducers/actions';
import FormContact from '../items/form.component';
import { Contact } from '../../../interfaces';
const { Meta } = Card;


const ListContactView = () => {
  const [data, dispatch] = useReducer(reducer, initialState, init);
  const [modalOpen, setModalOpen] = useState(false);
  const [toUpdate,setToUpdate] = useState(null)
  const [toDrawer,setToDrawer] = useState(null)
  const [openDrawer, setOpenDrawer] = useState(false);

  const showDrawer = (item : Contact) => {
    if(!openDrawer) {
      setOpenDrawer(true);
    }
    setToDrawer(item)
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  const onFinish = (values: any) => {
    if(values.id) {
      dispatch({type : UPDATE,toUpdateContact : {...values ,id : toUpdate.id}})
      setToUpdate(null);
    } else {
      dispatch({type : ADD,newContact : {...values , id : data.lastId + 1}})
    }
    setModalOpen(false)
  };

  const confirm = (e: React.MouseEvent<HTMLElement>,item) => {
    dispatch({type : DELETE,id : item.id})
    setOpenDrawer(false)
    setToDrawer(null)

  };

  const handleUpdate = (item : Contact) => {
    setOpenDrawer(false)
    setToUpdate(item);
    setModalOpen(true)
    setToDrawer(null)
  }

  const handleAdd = () => {
    setToUpdate(null)
    setModalOpen(true)
  }

  return (
    <div>
      <div style={{ display : 'flex' , justifyContent : "flex-end"}}>
        <Button type="default" icon={<PlusOutlined />} size={"large"}
          onClick={handleAdd} style={{marginBottom : 30}}
        >
          Ajouter Contact
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        grid={{ gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 4,
          xl: 5,
          xxl: 6, 
        }}
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 10,
        }}
        dataSource={data.contacts}
        footer={
          <div>
            <b>Total :</b> {data.contacts.length}
          </div>
        }
        renderItem={(item : Contact) => (
          <List.Item>
            <Card
              style={{ width: 250 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <IdcardOutlined onClick={() => showDrawer(item)} key="setting" />,
                <EditOutlined onClick={() => handleUpdate(item)} key="edit" />,
                <Popconfirm
                  key="ellipsis"
                  title="Supprimer le contact"
                  description="Voulez vous vraiment supprimer ce contact?"
                  onConfirm={(e : React.MouseEvent<HTMLElement>) => confirm(e,item)}
                  okText="Oui"
                  cancelText="Non"
                >
                  <DeleteOutlined type="link" />,
                </Popconfirm>
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
                title={item.prenom + " " +item.nom}
                description={item.numero}
              />
            </Card>
          </List.Item>
        )}
      />
      <Modal
        title="Ajouter nouveau contact"
        centered
        open={modalOpen}
        onOk={() => onFinish}
        onCancel={() => setModalOpen(false)}
        footer={[
        ]}
      >
        <FormContact contact={toUpdate} resultEmitter={onFinish} />

      </Modal>
      <Drawer title="Details Contact" placement="right" onClose={onClose} open={openDrawer}>
      {toDrawer && (<div style={{ display : 'flex' , flexDirection : "column", justifyContent : "flex-end"}}>
        <Descriptions column={1}  layout="vertical">
        <Descriptions.Item label="Prenom et Nom">{toDrawer.prenom + " " + toDrawer.nom}</Descriptions.Item>
        <Descriptions.Item label="Telephone">{toDrawer.numero}</Descriptions.Item>
        <Descriptions.Item label="Email">{toDrawer.email}</Descriptions.Item>
      </Descriptions>
        <div style={{ display : 'flex' , justifyContent : "flex-end", marginTop : 300}}>
          <Button type="primary" onClick={() => handleUpdate(toDrawer)}>Modifier</Button>
          <Popconfirm
                  key="ellipsis"
                  title="Supprimer le contact"
                  description="Voulez vous vraiment supprimer ce contact?"
                  onConfirm={(e : React.MouseEvent<HTMLElement>) => confirm(e,toDrawer)}
                  okText="Oui"
                  cancelText="Non"
                >
          <Button style={{marginLeft : 10}} danger type="primary">Supprimer</Button>
          </Popconfirm>
        </div>
      </div>)}

      </Drawer>
    </div>
  );

}

export default ListContactView;
