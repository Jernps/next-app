import React, { CSSProperties } from 'react'
import {Html, Body, Container, Text, Link, Preview,Tailwind} from '@react-email/components'

const WelcomeTemplate = ({name} : { name:string}) => {
  return (
   <Html>
    <Preview>Welcome aborard!!</Preview>
    <Tailwind>
      <body className='bg-white'>
          <Container>
              <Text className='font-bold text-3xl'>
                  Hello World
              </Text>
              <Link href='www.google.com'>Google</Link>
          </Container>
      </body>
    </Tailwind>
    </Html>
  )
}

const body : CSSProperties = {
  backgroundColor: '#fff',
  margin: 0,
  padding: 0,
}

export default WelcomeTemplate
