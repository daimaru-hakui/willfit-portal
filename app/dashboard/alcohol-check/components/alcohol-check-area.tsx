'use client';
import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  Card,
} from "@material-tailwind/react";
import AlcoholCheckForm from './alcohol-check-form';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';


const AlcoholCheckArea: FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const [isAlcoholCheck, setIsAlcoholCheck] = useState(true);

  const defaultValues = {
    alcoholCheck1: '2',
    alcoholCheck2: '2',
    alcoholCheckValue: 0,
  };

  useEffect(() => {
    if (!currentUser) return;
    const docRef = doc(db, "alcoholCheckList", todayDate);
    onSnapshot(docRef, (querySnapshot) => {
      setIsAlcoholCheck({ ...querySnapshot.data() }.member.includes(currentUser));
    });
  }, []);

  return (
    <>
      {!isAlcoholCheck && (
        <>
          <Button onClick={handleOpen}>アルコールチェック</Button>
          <Dialog
            size="xs"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none"
          >
            <Card className="mx-auto w-full max-w-[24rem]">
              <AlcoholCheckForm
                setOpen={setOpen}
                defaultValues={defaultValues}
                pageType='NEW'
              />
            </Card>
          </Dialog>
        </>
      )}
    </>
  );
};

export default AlcoholCheckArea;