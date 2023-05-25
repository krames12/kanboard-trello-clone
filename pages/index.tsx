import { Card, Grid, Text } from "@nextui-org/react";
import { PrismaClient, Board } from '@prisma/client'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';

import styles from '@/pages/index.module.css'

export default function Home({boards}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Available Boards - Kanclone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to Kanclone
        </h1>
        <Grid.Container gap={2} justify="flex-start">
          {boards.map((board: Board) => (
            <Grid xs={6} sm={3} md={2}>
              <Link href={`/boards/${board.id}`}>
                <Card
                  isPressable
                  isHoverable
                  variant="bordered"
                  css={{ mw: "400px" }}
                >
                  <Card.Body>
                    <Text>{board.title}</Text>
                  </Card.Body>
                </Card>
              </Link>
            </Grid>
          ))}
          <Grid xs={6} sm={3} md={2}>
            <Link href={`/boards/new`}>
              <Card
                isPressable
                isHoverable
                variant="bordered"
                css={{ mw: "400px" }}
              >
                <Card.Body>
                  <Text>Create new board +</Text>
                </Card.Body>
              </Card>
            </Link>
          </Grid>
        </Grid.Container>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const primsa = new PrismaClient();

  const boards = await primsa.board.findMany();

  return {
    props: { boards }
  }
}
