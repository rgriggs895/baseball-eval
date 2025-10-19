import { EvaluationForm } from '@/components/EvaluationForm';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Header } from '@/components/Header';

export default function Home() {
  return (
    <ProtectedRoute>
      <Header />
      <main className="min-h-screen py-8">
        <EvaluationForm />
      </main>
    </ProtectedRoute>
  );
}
