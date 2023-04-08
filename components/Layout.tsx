import React, { ReactNode } from 'react'
import Head from 'next/head'
import { Layout as antLayout, Menu, theme } from 'antd';
import Styles from "./layout.module.css";

const { Header } = antLayout;

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className={Styles.container}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Header>
      <div className={Styles.headerText}>ContactApp</div>
    </Header>
    <div className={Styles.content}>
    {children}
    </div>
    <footer>
      
    </footer>
  </div>
)

export default Layout
