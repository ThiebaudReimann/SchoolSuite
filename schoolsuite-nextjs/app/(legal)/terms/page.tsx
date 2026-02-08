import Link from "next/link";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 md:p-12 transition-colors">
            <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-gray-200 dark:border-zinc-800 shadow-sm">
                <Link
                    href="/"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline mb-8 inline-block font-medium"
                >
                    ← Zurück zur Startseite
                </Link>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Allgemeine Geschäftsbedingungen (AGB)</h1>

                <section className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">1. Geltungsbereich</h2>
                        <p>
                            Diese Geschäftsbedingungen gelten für die Nutzung der SchoolSuite-Plattform und alle damit verbundenen Dienstleistungen.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">2. Leistungen von SchoolSuite</h2>
                        <p>
                            SchoolSuite bietet eine Plattform zur Verwaltung von Hausaufgaben, Terminen und schulischen Aufgaben.
                            Der genaue Funktionsumfang ergibt sich aus der aktuellen Beschreibung auf der Website.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">3. Registrierung und Nutzerkonto</h2>
                        <p>
                            Für die Nutzung bestimmter Funktionen ist eine Registrierung erforderlich. Der Nutzer ist verpflichtet,
                            seine Zugangsdaten geheim zu halten und vor dem Zugriff durch Dritte zu schützen.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">4. Pflichten der Nutzer</h2>
                        <p>
                            Die Nutzer verpflichten sich, die Plattform nicht missbräuchlich zu nutzen. Insbesondere dürfen keine
                            rechtswidrigen Inhalte gespeichert oder verbreitet werden.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">5. Haftung</h2>
                        <p>
                            Wir bemühen uns um einen störungsfreien Betrieb der Plattform, können jedoch keine ständige Verfügbarkeit garantieren.
                            Die Haftung für leicht fahrlässige Pflichtverletzungen wird ausgeschlossen, sofern keine wesentlichen Vertragspflichten betroffen sind.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">6. Schlussbestimmungen</h2>
                        <p>
                            Es gilt das Recht der Bundesrepublik Deutschland. Sollten einzelne Bestimmungen dieser AGB unwirksam sein,
                            bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    );
}
