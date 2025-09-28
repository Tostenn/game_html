import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard() {
    const [joiningGame, setJoiningGame] = useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        recentlySuccessful,
    } = useForm({
        game_id: '',
    });
    console.log(usePage().props.flash);
    
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-4">
                        <h2 className="p-6 font-bold text-2xl text-gray-900 text-center">
                            plate forme pour faite des partir de carreau chinois
                        </h2>

                        <div className="flex items-center justify-center gap-4">
                            <PrimaryButton>
                                nouveau game
                            </PrimaryButton>
                            <PrimaryButton  onClick={() => setJoiningGame(!joiningGame)}>
                                rejoindre une partie
                            </PrimaryButton>

                        </div>
                        {joiningGame &&
                        <form onSubmit={e => {e.preventDefault(); post(route('game.join'))}}>

                            <div className="flex flex-col items-center my-4 justify-center gap-4 bg-gray-300 w-max mx-auto p-4">
                                <InputLabel htmlFor="name" value="id de la partie" />
                                <TextInput
                                    id="name"
                                    name="game_id"
                                    type="text"
                                    className="mt-1 block"
                                    autoComplete="name"
                                    value={data.game_id}
                                    onChange={(e) => setData('game_id', e.target.value)}
                                />
                                <InputError message={errors.game_id} className="mt-2" />
                                <PrimaryButton type='submit'>
                                    rejoindre la partie
                                </PrimaryButton>
                            </div>
                        </form>

                        }
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
