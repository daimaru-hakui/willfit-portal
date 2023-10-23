'use client';
import React, { FC } from 'react';
import {
  Typography,
  Input,
  Radio,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, arrayUnion, collection, doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';

type Inputs = {
  alcoholCheck1: string;
  alcoholCheck2: string;
  alcoholCheckValue: number;
};

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: Inputs;
  pageType: "NEW" | "EDIT";
  postId?: string;
}

const AlcoholCheckForm: FC<Props> = ({ setOpen, defaultValues, pageType, postId }) => {
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues
  });
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    switch (pageType) {
      case "NEW":
        await addAlcoholCheckList(data);
        break;
      case "EDIT":
        await updateAlcoholCheckData(data);
        break;
    }
    setOpen(false);
  };

  const addAlcoholCheckList = async (data: Inputs) => {
    if (!currentUser) return;
    try {
      const docRef = doc(db, "alcoholCheckList", todayDate);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          member: arrayUnion(currentUser)
        });
      } else {
        await setDoc(docRef, {
          id: todayDate,
          member: arrayUnion(currentUser)
        });
      }
      await addAlcoholCheckData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAlcoholCheckData = async (data: Inputs) => {
    await addDoc(collection(db, "alcoholCheckData"), {
      date: todayDate,
      uid: currentUser,
      createdAt: serverTimestamp(),
      alcoholCheck1: data.alcoholCheck1,
      alcoholCheck2: data.alcoholCheck2,
      alcoholCheckValue: Number(data.alcoholCheckValue) || 0,
    });
  };

  const updateAlcoholCheckData = async (data: Inputs) => {
    if (!postId) return;
    const docRef = doc(db, "alcoholCheckData", postId);
    updateDoc(docRef, {
      alcoholCheck1: data.alcoholCheck1,
      alcoholCheck2: data.alcoholCheck2,
      alcoholCheckValue: Number(data.alcoholCheckValue) || 0,
      updatedAt: serverTimestamp(),
    });
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardBody className="flex flex-col gap-4">
        <Typography variant="h4" color="blue-gray">
          アルコールチェック
        </Typography>
        <div>
          <Typography
            className="font-normal"
            variant="paragraph"
            color="gray"
          >
            アルコールの検査はしましたか？
          </Typography>
          <div className="flex gap-6">
            <Radio
              label="No"
              crossOrigin={undefined}
              {...register('alcoholCheck1')}
            />
            <Radio
              label="Yes"
              defaultChecked
              crossOrigin={undefined}
              {...register('alcoholCheck1')}
            />
          </div>
        </div>
        <div>
          <Typography
            className="font-normal"
            variant="paragraph"
            color="gray"
          >
            酒気帯び
          </Typography>
          <div className="flex gap-6">
            <Radio
              label="有"
              crossOrigin={undefined}
              {...register('alcoholCheck2')}
            />
            <Radio
              label="無"
              defaultChecked
              crossOrigin={undefined}
              {...register('alcoholCheck2')}
            />
          </div>
        </div>
        <div>
          <Typography
            className="font-normal"
            variant="paragraph"
            color="gray"
          >
            測定結果（mg）
          </Typography>
          <div className="flex gap-6">
            <Input type='number'
              step='0.01'
              min='0'
              defaultValue={0}
              className="!border !border-gray-300 bg-white text-gray-900 shadow-sm shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900"
              labelProps={{
                className: "hidden"
              }}
              crossOrigin={undefined}
              onFocus={focusHandler}
            />
          </div>
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" onClick={() => setOpen(false)} fullWidth>
          {pageType === 'NEW' ? "提出する" : "更新する"}
        </Button>
      </CardFooter>
    </form >
  );
};

export default AlcoholCheckForm;