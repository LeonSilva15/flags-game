import { Button, Grid, Text, Title } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';

import { FlagDisplay } from '../components';
import { countries, type Country } from '../data';

import './Game.css';

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
        return <Text size="xl">Loading game...</Text>;
    }

    if (showResult) {
        return (
            <div
                style={{
                    display: 'flex',
                    flexFlow: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <Title order={2}>Game Over!</Title>
                <Text size="xl">
                    Your score: {score} / {questionList.length}
                </Text>
                <Button onClick={() => window.location.reload()}>Play Again</Button>
            </div>
        );
    }

    const current = questionList[qIndex];
    return (
        <div>
            <Title ta="center">Flag Quiz</Title>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '10px'
                }}
            >
                <Text>
                    Question {qIndex + 1} of {questionList.length}
                </Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <FlagDisplay code={current.code} />
            </div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '20px'
                }}
            >
                <Grid className="options-list">
                    {options.map((opt) => (
                        <Grid.Col
                            span={{ sm: 6, xs: 12 }}
                            onClick={() => handleAnswer(opt)}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '80px',
                                border: 'solid 1px white'
                            }}
                        >
                            <Text size="xl" ta="center" fw={700}>
                                {opt}
                            </Text>
                        </Grid.Col>
                    ))}
                </Grid>
            </div>
            <Text ta="center">Score: {score}</Text>
        </div>
    );
}
