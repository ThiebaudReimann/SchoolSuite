import Link from "next/link";

export default function ImprintPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                <Link
                    href="/"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline mb-8 inline-block font-medium"
                >
                    ← Zurück zur Startseite
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Impressum</h1>

                <section className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Angaben gemäß § 5 TMG</h2>
                        {/* <p>
                            [Dein Name/Firmenname]<br />
                            [Straße und Hausnummer]<br />
                            [PLZ und Ort]
                        </p> */}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Kontakt</h2>
                        {/* <p>
                            Telefon: [Deine Telefonnummer]<br />
                            E-Mail: [Deine E-Mail-Adresse]
                        </p> */}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                        {/* <p>
                            [Name des Verantwortlichen]<br />
                            [Anschrift wie oben]
                        </p> */}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">EU-Streitschlichtung</h2>
                        <p>
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline ml-1">
                                https://ec.europa.eu/consumers/odr/
                            </a>.
                            Unsere E-Mail-Adresse finden Sie oben im Impressum.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
                        <p>
                            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
