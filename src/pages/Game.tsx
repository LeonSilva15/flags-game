import { Button, Grid, Rating, Text, Title } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { FlagDisplay } from '../components';
import { countries, type Country } from '../data';
import { disableOption, enableOptions, shuffle } from '../utils';

import './Game.css';

export function Game() {
    const [score, setScore] = useState(0);
    const [qIndex, setQIndex] = useState(0);
    const [lives, setLives] = useState(3);
    const [rightAnswer, setRightAnswer] = useState<string | null>(null);
    const [questionList, setQuestionList] = useState<Country[]>([]);
    const [options, setOptions] = useState<string[]>([]);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const shuffled = shuffle(countries);
        setQuestionList(shuffled);
    }, []);

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
    }, [qIndex, questionList]);

    const handleAnswer = (answer: string) => {
        requestAnimationFrame(() => {
            const current = questionList[qIndex];
            if (answer === current.name) {
                setScore((s) => s + 1);
                setQIndex((i) => i + 1);
                enableOptions();
            } else {
                disableOption(answer);
                const remaining = lives - 1;
                setLives(remaining);
                if (remaining === 0) {
                    setRightAnswer(current.name);
                    setShowResult(true);
                }
            }
        });
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
                {rightAnswer ? <Text>Right answer: {rightAnswer}</Text> : null}
                <Text size="xl">Your score: {score}</Text>
                <Button onClick={() => window.location.reload()}>Play Again</Button>
            </div>
        );
    }

    const current = questionList[qIndex];
    return (
        <div>
            <Title ta="center">Flag Quiz</Title>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Text size="lg">
                    Question {qIndex + 1} of {questionList.length}
                </Text>
                <Rating
                    value={lives}
                    count={3}
                    fullSymbol={<IconHeart color="red" fill="red" />}
                    emptySymbol={<IconHeart color="red" />}
                    color="red"
                    readOnly
                />
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
                            id={opt}
                            key={opt}
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
            <Text size="lg" ta="center">
                Score: {score}
            </Text>
        </div>
    );
}
