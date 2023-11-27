'use client';

import { FormEvent, useRef, useState } from "react";

import { askQuestion } from "@/utils/api";

export default function Question() {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);

  const questionFormRef = useRef<HTMLFormElement | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await askQuestion(e.currentTarget);
      setAnswer(res);
    } catch (error) {
      setError(error.message);
      console.error(error);
    } finally {
      setLoading(false);
      questionFormRef.current?.reset();
    }
  };

  return (
    <>
      <form ref={questionFormRef} onSubmit={onSubmit}>
        <div className="flex items-center justify-center gap-5">
          <input
            type="text"
            name="question"
            disabled={loading}
            placeholder="Ask a question"
            className="w-2/4 rounded-md border border-black/20 px-4 py-2 text-xl text-black/70 outline-gray-300"
          />
          <button
            disabled={loading}
            className="rounded-md bg-blue-400 px-4 py-2 text-black/75"
          >
            Search
          </button>
        </div>
      </form>
      {answer && (
        <div className="my-6 w-full rounded-md border border-green-500 px-6 py-4">
          {answer}
        </div>
      )}
      {error && <div className="mt-6 font-normal text-red-600">{error}</div>}
    </>
  );
}
