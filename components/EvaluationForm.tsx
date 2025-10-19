'use client';

import { FC, useState, useEffect } from 'react';
import { Rating } from './Rating';
import { VoiceNotes } from './VoiceNotes';
import { EvaluationData, initialEvaluationData, EvaluationCategory } from '@/types/evaluation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/lib/auth-context';
import jsPDF from 'jspdf';

export const EvaluationForm: FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<EvaluationData>(initialEvaluationData);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Calculate total points whenever any rating changes
  useEffect(() => {
    const total =
      formData.outfieldFundamentals +
      formData.outfieldArmStrength +
      formData.infieldFundamentals +
      formData.infieldArmStrength +
      formData.hittingFundamentals +
      formData.hittingPower +
      formData.pitchingFundamentals +
      formData.pitchingVelocity +
      formData.pitchingCommand +
      formData.catchingFundamentals +
      formData.catchingArmStrength +
      formData.catchingBlocking;

    setFormData((prev) => ({ ...prev, totalPoints: total }));
  }, [
    formData.outfieldFundamentals,
    formData.outfieldArmStrength,
    formData.infieldFundamentals,
    formData.infieldArmStrength,
    formData.hittingFundamentals,
    formData.hittingPower,
    formData.pitchingFundamentals,
    formData.pitchingVelocity,
    formData.pitchingCommand,
    formData.catchingFundamentals,
    formData.catchingArmStrength,
    formData.catchingBlocking,
  ]);

  const handleInputChange = (field: keyof EvaluationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRatingChange = (field: EvaluationCategory, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddNote = (note: string) => {
    setFormData((prev) => ({ ...prev, notes: [...prev.notes, note] }));
  };

  const handleDeleteNote = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      notes: prev.notes.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!formData.playerNumber || !formData.ageGroup) {
      alert('Please enter at least Player Number and Age Group');
      return;
    }

    if (!user) {
      alert('You must be logged in to save evaluations');
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      console.log('Attempting to save to Supabase...');
      const { data, error } = await supabase.from('player_evaluations').insert([
        {
          user_id: user.id,
          player_number: formData.playerNumber,
          age_group: formData.ageGroup,
          primary_position: formData.primaryPosition,
          secondary_position: formData.secondaryPosition,
          outfield_fundamentals: formData.outfieldFundamentals || null,
          outfield_arm_strength: formData.outfieldArmStrength || null,
          infield_fundamentals: formData.infieldFundamentals || null,
          infield_arm_strength: formData.infieldArmStrength || null,
          hitting_fundamentals: formData.hittingFundamentals || null,
          hitting_power: formData.hittingPower || null,
          pitching_fundamentals: formData.pitchingFundamentals || null,
          pitching_velocity: formData.pitchingVelocity || null,
          pitching_command: formData.pitchingCommand || null,
          catching_fundamentals: formData.catchingFundamentals || null,
          catching_arm_strength: formData.catchingArmStrength || null,
          catching_blocking: formData.catchingBlocking || null,
          total_points: formData.totalPoints,
          notes: formData.notes,
        },
      ]);

      if (error) {
        console.error('Supabase error details:', JSON.stringify(error, null, 2));
        throw error;
      }

      console.log('Save successful!', data);
      setSaveMessage('Player evaluation saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error: any) {
      console.error('Error saving evaluation - Full error:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error || {}));

      let errorMessage = 'Unknown error';

      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.error_description) {
        errorMessage = error.error_description;
      } else if (error?.hint) {
        errorMessage = error.hint;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }

      alert(`Error saving evaluation: ${errorMessage}\n\nPlease check:\n1. Your Supabase credentials in .env.local\n2. The player_evaluations table exists\n3. Row Level Security policies allow inserts\n\nSee browser console for more details.`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all fields?')) {
      setFormData(initialEvaluationData);
      setSaveMessage('');
    }
  };

  const handleViewData = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Header
    pdf.setFillColor(10, 35, 66); // Navy
    pdf.rect(0, 0, 297, 30, 'F');

    pdf.setTextColor(212, 175, 55); // Gold
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Midland Baseball TN', 148.5, 12, { align: 'center' });
    pdf.setFontSize(16);
    pdf.text('Player Evaluation', 148.5, 22, { align: 'center' });

    // Reset text color
    pdf.setTextColor(10, 35, 66); // Navy

    // Player Info
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    let yPos = 40;

    pdf.text(`Player Number: ${formData.playerNumber || 'N/A'}`, 20, yPos);
    pdf.text(`Age Group: ${formData.ageGroup || 'N/A'}`, 120, yPos);
    yPos += 8;
    pdf.text(`Primary Position: ${formData.primaryPosition || 'N/A'}`, 20, yPos);
    pdf.text(`Secondary Position: ${formData.secondaryPosition || 'N/A'}`, 120, yPos);

    // Evaluations
    yPos += 15;
    pdf.setFontSize(14);
    pdf.setTextColor(212, 175, 55); // Gold
    pdf.text('Evaluations', 20, yPos);
    pdf.setTextColor(10, 35, 66); // Navy

    yPos += 8;
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');

    const evaluations = [
      { label: 'Outfield - Fundamentals', value: formData.outfieldFundamentals },
      { label: 'Outfield - Arm Strength', value: formData.outfieldArmStrength },
      { label: 'Infield - Fundamentals', value: formData.infieldFundamentals },
      { label: 'Infield - Arm Strength', value: formData.infieldArmStrength },
      { label: 'Hitting - Fundamentals', value: formData.hittingFundamentals },
      { label: 'Hitting - Power', value: formData.hittingPower },
      { label: 'Pitching - Fundamentals', value: formData.pitchingFundamentals },
      { label: 'Pitching - Velocity', value: formData.pitchingVelocity },
      { label: 'Pitching - Command', value: formData.pitchingCommand },
      { label: 'Catching - Fundamentals', value: formData.catchingFundamentals },
      { label: 'Catching - Arm Strength', value: formData.catchingArmStrength },
      { label: 'Catching - Blocking', value: formData.catchingBlocking },
    ];

    const col1X = 20;
    const col2X = 110;
    const col3X = 200;
    let currentCol = col1X;
    let itemsInCol = 0;

    evaluations.forEach((item) => {
      pdf.text(`${item.label}: ${item.value || 0}/5`, currentCol, yPos);
      yPos += 6;
      itemsInCol++;

      if (itemsInCol === 4) {
        itemsInCol = 0;
        yPos = 71; // Reset to start of columns
        if (currentCol === col1X) currentCol = col2X;
        else if (currentCol === col2X) currentCol = col3X;
      }
    });

    // Total Points
    yPos = 95;
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Total Evaluation Points: ${formData.totalPoints}/60`, 20, yPos);

    // Notes
    if (formData.notes.length > 0) {
      yPos += 10;
      pdf.setFontSize(14);
      pdf.setTextColor(212, 175, 55); // Gold
      pdf.text('Notes', 20, yPos);
      pdf.setTextColor(10, 35, 66); // Navy

      yPos += 8;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');

      formData.notes.forEach((note, index) => {
        const lines = pdf.splitTextToSize(`${index + 1}. ${note}`, 257);
        lines.forEach((line: string) => {
          if (yPos > 190) {
            pdf.addPage();
            yPos = 20;
          }
          pdf.text(line, 20, yPos);
          yPos += 5;
        });
      });
    }

    // Footer
    pdf.setFontSize(8);
    pdf.setTextColor(128, 128, 128);
    pdf.text(
      `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
      148.5,
      200,
      { align: 'center' }
    );

    // Save PDF
    pdf.save(
      `evaluation-${formData.playerNumber || 'player'}-${Date.now()}.pdf`
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-xl border-4 border-navy p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-4 border-gold">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-navy">M</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-navy">
                Midland Baseball TN
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gold">
                Player Evaluation
              </h2>
            </div>
          </div>
        </div>

        {/* Player Info Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-bold text-navy mb-2">
              Player Number: *
            </label>
            <input
              type="text"
              value={formData.playerNumber}
              onChange={(e) => handleInputChange('playerNumber', e.target.value)}
              className="w-full p-3 border-2 border-navy rounded focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="Enter player number"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-2">
              Age Group: *
            </label>
            <input
              type="text"
              value={formData.ageGroup}
              onChange={(e) => handleInputChange('ageGroup', e.target.value)}
              className="w-full p-3 border-2 border-navy rounded focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="e.g., 12U, 14U"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-2">
              Primary Position:
            </label>
            <input
              type="text"
              value={formData.primaryPosition}
              onChange={(e) => handleInputChange('primaryPosition', e.target.value)}
              className="w-full p-3 border-2 border-navy rounded focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="e.g., Pitcher, Catcher"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-navy mb-2">
              Secondary Position:
            </label>
            <input
              type="text"
              value={formData.secondaryPosition}
              onChange={(e) => handleInputChange('secondaryPosition', e.target.value)}
              className="w-full p-3 border-2 border-navy rounded focus:outline-none focus:ring-2 focus:ring-gold"
              placeholder="e.g., Outfield, Infield"
            />
          </div>
        </div>

        {/* Evaluations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Evaluations */}
          <div className="space-y-6">
            {/* Outfield */}
            <div className="border-2 border-navy rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-navy mb-3 pb-2 border-b-2 border-gold">
                Outfield
              </h3>
              <Rating
                label="Fundamentals"
                value={formData.outfieldFundamentals}
                onChange={(val) => handleRatingChange('outfieldFundamentals', val)}
              />
              <Rating
                label="Arm Strength"
                value={formData.outfieldArmStrength}
                onChange={(val) => handleRatingChange('outfieldArmStrength', val)}
              />
            </div>

            {/* Infield */}
            <div className="border-2 border-navy rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-navy mb-3 pb-2 border-b-2 border-gold">
                Infield
              </h3>
              <Rating
                label="Fundamentals"
                value={formData.infieldFundamentals}
                onChange={(val) => handleRatingChange('infieldFundamentals', val)}
              />
              <Rating
                label="Arm Strength"
                value={formData.infieldArmStrength}
                onChange={(val) => handleRatingChange('infieldArmStrength', val)}
              />
            </div>

            {/* Hitting */}
            <div className="border-2 border-navy rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-navy mb-3 pb-2 border-b-2 border-gold">
                Hitting
              </h3>
              <Rating
                label="Fundamentals"
                value={formData.hittingFundamentals}
                onChange={(val) => handleRatingChange('hittingFundamentals', val)}
              />
              <Rating
                label="Power"
                value={formData.hittingPower}
                onChange={(val) => handleRatingChange('hittingPower', val)}
              />
            </div>

            {/* Pitching */}
            <div className="border-2 border-navy rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-navy mb-3 pb-2 border-b-2 border-gold">
                Pitching
              </h3>
              <Rating
                label="Fundamentals"
                value={formData.pitchingFundamentals}
                onChange={(val) => handleRatingChange('pitchingFundamentals', val)}
              />
              <Rating
                label="Velocity"
                value={formData.pitchingVelocity}
                onChange={(val) => handleRatingChange('pitchingVelocity', val)}
              />
              <Rating
                label="Command"
                value={formData.pitchingCommand}
                onChange={(val) => handleRatingChange('pitchingCommand', val)}
              />
            </div>

            {/* Catching */}
            <div className="border-2 border-navy rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-navy mb-3 pb-2 border-b-2 border-gold">
                Catching
              </h3>
              <Rating
                label="Fundamentals"
                value={formData.catchingFundamentals}
                onChange={(val) => handleRatingChange('catchingFundamentals', val)}
              />
              <Rating
                label="Arm Strength"
                value={formData.catchingArmStrength}
                onChange={(val) => handleRatingChange('catchingArmStrength', val)}
              />
              <Rating
                label="Blocking"
                value={formData.catchingBlocking}
                onChange={(val) => handleRatingChange('catchingBlocking', val)}
              />
            </div>
          </div>

          {/* Right Column - Notes */}
          <div className="space-y-6">
            <div className="border-2 border-navy rounded-lg p-4 bg-gray-50">
              <h3 className="text-lg font-bold text-navy mb-3 pb-2 border-b-2 border-gold">
                Notes
              </h3>
              <VoiceNotes
                notes={formData.notes}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
              />
            </div>
          </div>
        </div>

        {/* Total Points */}
        <div className="mb-8 p-4 bg-gold rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-navy">
              Total Evaluation Points:
            </span>
            <span className="text-3xl font-bold text-navy">
              {formData.totalPoints} / 60
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-4 bg-navy text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg min-w-[150px]"
          >
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-8 py-4 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors text-lg min-w-[150px]"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleViewData}
            className="px-8 py-4 bg-gold text-navy font-bold rounded-lg hover:bg-opacity-90 transition-colors text-lg min-w-[150px]"
          >
            View Data
          </button>
        </div>

        {/* Save Message */}
        {saveMessage && (
          <div className="mt-4 p-4 bg-green-100 border-2 border-green-500 rounded-lg text-center">
            <p className="text-green-800 font-semibold">{saveMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};
