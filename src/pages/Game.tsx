import { useCallback, useEffect, useState } from 'react';
import { FlagDisplay } from '../components/FlagDisplay';
import { countries, type Country } from '../data';

const TOTAL_QUESTIONS = 10;

export function Game() {
    const [score, setScore] = useState(0);
    const [qIndex, setQIndex] = useState(0);
    const [questionList, setQuestionList] = useState<Country[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    const shuffle = useCallback((array: Country[]) => {
        let index = array.length;
        let random = 1;
        let temp = array[0];
        while (--index > 0) {
            random = Math.floor(Math.random() * (index + 1));
            temp = array[random];
            array[random] = array[index];
            array[index] = temp;
        }
        return array;
    }, []);

    useEffect(() => {
        const shuffled = shuffle(countries).slice(0, TOTAL_QUESTIONS);
        setQuestionList(shuffled);
    }, [shuffle]);

    useEffect(() => {
        if (qIndex < questionList.length) {
            const current = questionList[qIndex];
            setOptions(
                shuffle([
                    current,
                    ...shuffle(countries.filter((c) => c.name !== current.name)).slice(0, 3)
                ]).map((c) => c.name)
            );
        }
    }, [qIndex, questionList, shuffle]);

    const handleAnswer = (answer: string) => {
        const current = questionList[qIndex];
        if (answer === current.name) {
            setScore((s) => s + 1);
        }
        if (qIndex + 1 < TOTAL_QUESTIONS) {
            // questionList.length) {
            setQIndex((i) => i + 1);
        } else {
            setShowResult(true);
        }
    };

    if (questionList.length === 0) {
        return <p>Loading game...</p>;
    }

    if (showResult) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-3xl">Game Over!</h2>
                <p className="text-xl">
                    Your score: {score} / {questionList.length}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                >
                    Play Again
                </button>
            </div>
        );
    }

    const current = questionList[qIndex];
    return (
        <div className="flex flex-col items-center mt-10 gap-4">
            <h1 className="text-2xl font-bold">Flag Quiz</h1>
            <p>
                Question {qIndex + 1} of {questionList.length}
            </p>
            <div className="w-64 h-3 bg-gray-200 rounded overflow-hidden">
                <div
                    className="h-full bg-blue-500"
                    style={{ width: `${((TOTAL_QUESTIONS - qIndex) / TOTAL_QUESTIONS) * 100}%` }}
                ></div>
            </div>
            <FlagDisplay code={current.code} />
            <div className="grid grid-cols-2 gap-4">
                {options.map((opt) => (
                    <button
                        key={opt}
                        onClick={() => handleAnswer(opt)}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        {opt}
                    </button>
                ))}
            </div>
            <p>Score: {score}</p>
        </div>
    );
}
