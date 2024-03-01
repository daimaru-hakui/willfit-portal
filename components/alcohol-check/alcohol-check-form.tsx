"use client";
import React, { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import { Box, Button, Radio, Flex, Stack, NumberInput } from "@mantine/core";
import { AlcoholCheckInputs } from "@/type";

interface Props {
  close: () => void;
  defaultValues: AlcoholCheckInputs;
  pageType: "NEW" | "EDIT";
  dateId?: string;
  userId?: string;
}

const AlcoholCheckForm: FC<Props> = ({
  close,
  defaultValues,
  pageType,
  dateId,
  userId,
}) => {
  const [alchoolCheckValue, setAlcholCheckValue] = useState<string | number>(
    defaultValues.alcoholCheckValue
  );
  const todayDate = format(new Date(), "yyyy-MM-dd");
  const session = useSession();
  const currentUser = session.data?.user.uid;
  const { register, handleSubmit } = useForm<AlcoholCheckInputs>({
    defaultValues: {
      ...defaultValues,
      alcoholCheck1: String(defaultValues.alcoholCheck1),
      alcoholCheck2: String(defaultValues.alcoholCheck2),
    },
  });
  const onSubmit: SubmitHandler<AlcoholCheckInputs> = async (data) => {
    switch (pageType) {
      case "NEW":
        await addAlcoholCheckList(data);
        close();
        break;
      case "EDIT":
        await updateAlcoholCheckData(data);
        close();
        break;
    }
  };

  const addAlcoholCheckList = async (data: AlcoholCheckInputs) => {
    const result = confirm("提出して宜しいでしょうか。");
    if (!result && !currentUser) return;
    try {
      const docRef = doc(db, "alcoholCheckList", todayDate);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          member: arrayUnion(currentUser),
        });
      } else {
        await setDoc(docRef, {
          id: todayDate,
          member: arrayUnion(currentUser),
        });
      }
      await addAlcoholCheckData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addAlcoholCheckData = async (data: AlcoholCheckInputs) => {
    // await addDoc(collection(db, "alcoholCheckData"), {
    //   date: todayDate,
    //   uid: currentUser,
    //   createdAt: serverTimestamp(),
    //   alcoholCheck1: data.alcoholCheck1,
    //   alcoholCheck2: data.alcoholCheck2,
    //   alcoholCheckValue: alchoolCheckValue || 0,
    // });
    // 2024年度以降
    const userRef = doc(db, "users", currentUser as string);
    const user = await getDoc(userRef);
    await setDoc(
      doc(
        db,
        "alcoholCheckList",
        todayDate,
        "alcoholCheckData",
        `${currentUser}`
      ),
      {
        date: todayDate,
        uid: currentUser,
        createdAt: serverTimestamp(),
        alcoholCheck1: Number(data.alcoholCheck1),
        alcoholCheck2: Number(data.alcoholCheck2),
        alcoholCheckValue: Number(alchoolCheckValue) || 0,
        userRef,
        username: user?.data()?.name || "",
      }
    );
  };

  const updateAlcoholCheckData = async (data: AlcoholCheckInputs) => {
    if (!dateId) return;
    const documentRef = doc(
      db,
      "alcoholCheckList",
      `${dateId}`,
      "alcoholCheckData",
      `${userId}`
    );
    updateDoc(documentRef, {
      alcoholCheck1: Number(data.alcoholCheck1),
      alcoholCheck2: Number(data.alcoholCheck2),
      alcoholCheckValue: Number(alchoolCheckValue) || 0,
      updatedAt: serverTimestamp(),
    });
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={24}>
        <Stack gap={6}>
          アルコールの検査はしましたか？
          <Flex gap={12}>
            <Radio
              label="No"
              value="0"
              color="red"
              {...register("alcoholCheck1")}
            />
            <Radio
              label="Yes"
              value="1"
              defaultChecked
              {...register("alcoholCheck1")}
            />
          </Flex>
        </Stack>
        <Stack gap={6}>
          <Box>酒気帯び</Box>
          <Flex gap={12}>
            <Radio
              label="有"
              value="0"
              color="red"
              {...register("alcoholCheck2")}
            />
            <Radio
              label="無"
              value="1"
              defaultChecked
              {...register("alcoholCheck2")}
            />
          </Flex>
        </Stack>
        <Stack gap={6}>
          <Box>測定結果（mg）</Box>
          <NumberInput
            onFocus={focusHandler}
            value={alchoolCheckValue}
            min={0}
            onChange={(e) => setAlcholCheckValue(e)}
          />
        </Stack>
        <Button type="submit" fullWidth>
          {pageType === "NEW" ? "提出する" : "更新する"}
        </Button>
      </Stack>
    </form>
  );
};

export default AlcoholCheckForm;
